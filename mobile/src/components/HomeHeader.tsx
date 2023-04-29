import { Heading, HStack, Text, VStack, Icon, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { messageError } from "@utils/messageError";
import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";

export function HomeHeader() {
  const toast = useToast();
  const { user, signOut } = useAuth();

  const firstName = user.name.split(" ")[0];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Ocorreu um erro ao deslogar da aplicação, tente mais tarde!",
      });
    }
  };

  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <UserPhoto
        size={16}
        source={{ uri: user.avatar }}
        alt={user.name}
        hasAvatar={!!user.avatar}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading fontFamily="heading" color="gray.100">
          {firstName}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleLogout}>
        <Icon as={MaterialIcons} name="logout" color="gray.300" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
