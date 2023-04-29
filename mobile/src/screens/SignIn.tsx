import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { messageError } from "@utils/messageError";

type FormSignIn = {
  email: string;
  password: string;
};

const formSignInSchema = yup.object({
  password: yup.string().required("Informe a senha!"),
  email: yup
    .string()
    .required("Informe o e-mail!")
    .email("E-mail não é valido!"),
});

export function SignIn() {
  const toast = useToast();
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSignIn>({
    resolver: yupResolver(formSignInSchema),
  });

  const handleNewAccount = () => navigation.navigate("signUp");

  const handleSignIn = async ({ email, password }: FormSignIn) => {
    try {
      await signIn({ email, password });
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível fazer o login. Tente novamente mais tarde!",
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

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center mt={8}>
          <Heading mb={6} fontFamily="heading" color="gray.100">
            Acesse sua conta
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            mt={2}
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignIn)}
          />

          <Text color="gray.200" fontSize="md" mt={24}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            mt={2}
            isDisabled={isSubmitting}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
