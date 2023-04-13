import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciesDTO";
import { api } from "@services/axios";

type ExerciseCardProps = TouchableOpacityProps & {
  exercise: ExerciseDTO;
};

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt={exercise.name}
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
          mr={4}
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {exercise.name}
          </Heading>
          <Text fontSize="sm" mt={1} numberOfLines={2} color="gray.200">
            {`${exercise.series} séries x ${exercise.repetitions} repetições`}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
