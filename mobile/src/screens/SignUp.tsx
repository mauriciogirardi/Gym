import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { api } from "@services/axios";
import { AppError } from "@utils/AppError";

type FormSignUp = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const formSignUpSchema = yup.object({
  name: yup.string().required("Informe o nome!"),
  email: yup
    .string()
    .required("Informe o e-amil!")
    .email("E-mail não é valido!"),
  password: yup
    .string()
    .required("Informe a senha!")
    .min(6, "A senha deve ter pelo menos 6 dígitos!"),
  password_confirm: yup
    .string()
    .required("Confirme a senha!")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere!"),
});

export function SignUp() {
  const toast = useToast();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSignUp>({
    resolver: yupResolver(formSignUpSchema),
  });

  const handleBackLogin = () => navigation.goBack();

  const handleSignUp = async (data: FormSignUp) => {
    try {
      await api.post("/users", data);

      toast.show({
        title:
          "Usuário cadastrado com sucesso. Você já pode fazer login na aplicação!",
        placement: "top",
        bg: "green.500",
      });

      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente mais tarde!";

      return toast.show({
        title,
        placement: "top",
        bg: "red.500",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={6} pb={4}>
        <Image
          source={backgroundImg}
          defaultSource={backgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center mt={24} mb={10}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading mb={6} fontFamily="heading" color="gray.100">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            mt={2}
            onPress={handleSubmit(handleSignUp)}
            isDisabled={isSubmitting}
          />

          <Button
            title="Voltar para o login"
            variant="outline"
            mt={16}
            isDisabled={isSubmitting}
            onPress={handleBackLogin}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
