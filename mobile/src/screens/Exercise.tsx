import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SvgProps } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ExerciseDTO } from "@dtos/ExerciesDTO";
import { Loading } from "@components/Loading";
import { Button } from "@components/Button";
import { api } from "@services/axios";

import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import BodySvg from "@assets/body.svg";
import { messageError } from "@utils/messageError";

interface GroupExerciseProps {
  title: string;
  icon?: React.FC<SvgProps>;
}

interface RouteParams {
  exerciseId: string;
}

export function Exercise() {
  const toast = useToast();
  const route = useRoute();
  const [exercise, setExercise] = useState<ExerciseDTO>();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { exerciseId } = route.params as RouteParams;

  const handleGoBack = () => navigation.goBack();

  const fetchExerciseDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const { data } = await api.get(`/exercises/${exerciseId}`);
      setExercise(data);
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível carregar os detalhes do exercícios!",
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleExerciseHistoryRegister = async () => {
    try {
      setIsSubmittingRegister(true);
      await api.post(`/history`, { exercise_id: exerciseId });
      toast.show({
        title: "Parabéns exercício registrado no seu histórico!",
        bg: "green.700",
        placement: "top",
      });

      navigation.navigate("history");
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível registrar o exercício!",
      });
    } finally {
      setIsSubmittingRegister(false);
    }
  };

  const groupExercise = ({ title, icon: Icon }: GroupExerciseProps) => {
    return (
      <HStack alignItems="center">
        {!!Icon && <Icon />}
        <Text ml={2} color="gray.200" fontSize="md">
          {title}
        </Text>
      </HStack>
    );
  };

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.600" size={6} />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" py={6}>
          <Heading
            color="gray.100"
            fontSize="xl"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise?.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text
              ml={1}
              color="gray.200"
              fontSize="md"
              textTransform="capitalize"
            >
              {exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoadingDetails ? (
        <Loading />
      ) : (
        <VStack flex={1} p={8}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                alt={`Imagem do exercício ${exercise?.name}`}
                w="full"
                h={80}
                resizeMode="cover"
                rounded="lg"
              />
            </Box>

            <Box bg="gray.600" rounded="md" p={4}>
              <HStack alignItems="center" justifyContent="space-between">
                {groupExercise({
                  title: `${exercise?.series} séries`,
                  icon: SeriesSvg,
                })}
                {groupExercise({
                  title: `${exercise?.repetitions} repetições`,
                  icon: RepetitionsSvg,
                })}
              </HStack>

              <Button
                mt={6}
                title="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={isSubmittingRegister}
              />
            </Box>
          </ScrollView>
        </VStack>
      )}
    </VStack>
  );
}
