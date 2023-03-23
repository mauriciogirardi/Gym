import { Box, Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SvgProps } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import BodySvg from "@assets/body.svg";

const TYPE_SERIES = "S";
const TYPE_REPETITION = "R";

interface GroupExerciseProps {
  title: string;
  icon?: React.FC<SvgProps>;
  type: "S" | "R";
}

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => navigation.goBack();

  const groupExercise = ({ title, icon: Icon, type }: GroupExerciseProps) => {
    return (
      <HStack alignItems="center">
        {!!Icon && <Icon />}
        <Text ml={2} color="gray.200" fontSize="md">
          {title}
        </Text>
      </HStack>
    );
  };

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.600" size={6} />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" py={6}>
          <Heading color="gray.100" fontSize="xl" flexShrink={1}>
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text
              ml={1}
              color="gray.200"
              fontSize="md"
              textTransform="capitalize"
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack flex={1} p={8}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Image
            source={{ uri: "https://i.ytimg.com/vi/JE3XUqMyHXo/mqdefault.jpg" }}
            alt="Imagem do exercício Puxada frontal"
            w="full"
            h={80}
            rounded="lg"
            resizeMode="cover"
            mb={3}
          />

          <Box bg="gray.600" rounded="md" p={4}>
            <HStack alignItems="center" justifyContent="space-between">
              {groupExercise({
                title: "3 séries",
                icon: SeriesSvg,
                type: TYPE_SERIES,
              })}
              {groupExercise({
                title: "12 repetições",
                icon: RepetitionsSvg,
                type: TYPE_REPETITION,
              })}
            </HStack>

            <Button mt={6} title="Marcar como realizado" />
          </Box>
        </ScrollView>
      </VStack>
    </VStack>
  );
}
