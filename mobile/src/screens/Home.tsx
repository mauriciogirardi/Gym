import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/axios";
import { ExerciseDTO } from "@dtos/ExerciesDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const toast = useToast();
  const [groupSelected, setGroupSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGroupSelected = (group: string) => setGroupSelected(group);

  const handleOpenExerciseDetails = () => {
    navigation.navigate("exercise");
  };

  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares!";
      toast.show({
        title,
        placement: "top",
        bg: "red.500",
      });
    }
  };

  const fetchExercisesByGroups = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios!";
      toast.show({
        title,
        placement: "top",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroups();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => handleGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={handleOpenExerciseDetails}
                exercise={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </VStack>
    </VStack>
  );
}
