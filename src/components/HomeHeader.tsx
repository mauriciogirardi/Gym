import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
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
        source={{ uri: "https://github.com/mauriciogirardi.png" }}
        alt="Mauricio"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading fontFamily="heading" color="gray.100">
          Mauricio
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.300" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
