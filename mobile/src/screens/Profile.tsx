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
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function Profile() {
  const toast = useToast();
  const [showPasswords, setShowPasswords] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/mauriciogirardi.png"
  );

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

      const photoUri = assets[0].uri;
      const photoInfo = await FileSystem.getInfoAsync(photoUri);
      const hasImgFiveMb = photoInfo.size && photoInfo.size / 1024 / 1024 > 5;

      if (hasImgFiveMb) {
        return toast.show({
          title: "Essa imagem é muito grande. Escolha uma de até 5MB!",
          placement: "top",
          bg: "red.500",
        });
      }

      setUserPhoto(photoUri);
    } catch (error) {
      console.error(error);
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
            source={{ uri: userPhoto }}
            alt="Mauricio"
            resizeMode="center"
            mt={6}
            isLoading={loadingPhoto}
            skeletonStyles={{ mt: 6 }}
            hasAvatar={!!userPhoto}
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

        <Input bg="gray.600" placeholder="Nome" />
        <Input
          bg="gray.600"
          placeholder="E-mail"
          isDisabled
          value="maurigirarde@yahoo.com.br"
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
        <Input
          bg="gray.600"
          placeholder="Senha antiga"
          secureTextEntry={showPasswords}
        />
        <Input
          bg="gray.600"
          placeholder="Nova senha"
          secureTextEntry={showPasswords}
        />
        <Input
          bg="gray.600"
          placeholder="Confirme a nova senha"
          secureTextEntry={showPasswords}
        />
        <Button title="Atualiza" mt={4} />
      </ScrollView>
    </VStack>
  );
}
