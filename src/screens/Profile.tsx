import {
  Center,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useState } from "react";

export function Profile() {
  const [showPasswords, setShowPasswords] = useState(false);

  const handleShowPassword = () => setShowPasswords((prevState) => !prevState);

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
            source={{ uri: "https://github.com/mauriciogirardi.png" }}
            alt="Mauricio"
            resizeMode="center"
            mt={6}
            isLoading={false}
            skeletonStyles={{ mt: 6 }}
          />
          <TouchableOpacity>
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
          <Heading color="gray.300" fontSize="md">
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
