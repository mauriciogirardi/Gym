import {
  Center,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { ScreenHeader } from "@components/ScreenHeader";
import { messageError } from "@utils/messageError";
import { UserPhoto } from "@components/UserPhoto";
import { message } from "@utils/message";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { api } from "@services/axios";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .when("password", {
      is: (field: any) => field,
      then: () =>
        yup
          .string()
          .nullable()
          .required("Informe a confirmação da senha!")
          .oneOf(
            [yup.ref("password")],
            "A confirmação da senha deve ser igual!"
          )
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const { user, updateUserProfile } = useAuth();
  const toast = useToast();
  const [showPasswords, setShowPasswords] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  const handleProfileUpdate = async (data: FormDataProps) => {
    try {
      setIsFetching(true);
      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      toast.show({
        title: "Dados atualizados com sucesso!",
        placement: "top",
        bg: "green.700",
      });

      await updateUserProfile(userUpdated);
    } catch (error) {
      messageError({
        error,
        toast,
        message: "Não foi possível atualizar os dados!",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleShowPassword = () => setShowPasswords((prevState) => !prevState);

  const handleUserPhotoSelected = async () => {
    try {
      setLoadingPhoto(true);
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (canceled || !assets[0].uri) return;

      const photoSelected = assets[0];

      const photoUri = photoSelected.uri;
      const photoInfo = await FileSystem.getInfoAsync(photoUri);
      const hasImgFiveMb = photoInfo.size && photoInfo.size / 1024 / 1024 > 5;

      if (hasImgFiveMb) {
        return message({
          title: "Essa imagem é muito grande. Escolha uma de até 5MB!",
          type: "error",
          toast,
        });
      }

      const fileExtension = photoSelected.uri.split(".").pop();
      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLowerCase(),
        uri: photoSelected.uri,
        type: `${photoSelected.type}/${fileExtension}`,
      } as any;

      const userPhotoUploadForm = new FormData();
      userPhotoUploadForm.append("avatar", photoFile);

      const { data } = await api.patch("/users/avatar", userPhotoUploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userUpdated = user;
      userUpdated.avatar = data.avatar;

      await updateUserProfile(userUpdated);

      message({ title: "Foto atualizada!", toast });
    } catch (error) {
      console.log(error);
      messageError({ error, toast, message: "Erro ao salvar imagem!" });
    } finally {
      setLoadingPhoto(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ pb: 10 }}
        px={6}
      >
        <Center>
          <UserPhoto
            size={24}
            source={{ uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }}
            alt="Mauricio"
            resizeMode="center"
            mt={6}
            isLoading={loadingPhoto}
            skeletonStyles={{ mt: 6 }}
            hasAvatar={!!user.avatar}
          />
          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              color="green.500"
              fontWeight="bold"
              mt={2}
              mb={8}
              fontSize="md"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              bg="gray.600"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              bg="gray.600"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              isDisabled
              placeholder="E-mail"
            />
          )}
        />

        <HStack
          mb={2}
          mt={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading color="gray.300" fontSize="md" fontFamily="heading">
            Alterar senha
          </Heading>

          <TouchableOpacity onPress={handleShowPassword}>
            {showPasswords ? (
              <Icon
                as={Feather}
                mr={4}
                name="eye-off"
                size={18}
                color="green.600"
              />
            ) : (
              <Icon
                mr={4}
                as={Feather}
                name="eye"
                size={18}
                color="green.600"
              />
            )}
          </TouchableOpacity>
        </HStack>

        <Controller
          control={control}
          name="old_password"
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"
              secureTextEntry={showPasswords}
              onChangeText={onChange}
              errorMessage={errors.old_password?.message}
              placeholder="Senha antiga"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"
              secureTextEntry={showPasswords}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              placeholder="Nova senha"
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange } }) => (
            <Input
              bg="gray.600"
              secureTextEntry={showPasswords}
              onChangeText={onChange}
              errorMessage={errors.confirm_password?.message}
              placeholder="Confirmação da senha"
            />
          )}
        />

        <Button
          title="Atualiza"
          mt={4}
          onPress={handleSubmit(handleProfileUpdate)}
          isLoading={isFetching}
        />
      </ScrollView>
    </VStack>
  );
}
