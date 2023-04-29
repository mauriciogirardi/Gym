import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ExerciseCard } from "@components/ExerciseCard";
import { ExerciseDTO } from "@dtos/ExerciesDTO";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { Group } from "@components/Group";
import { api } from "@services/axios";
import { messageError } from "@utils/messageError";

export function Home() {
  const toast = useToast();
  const [groupSelected, setGroupSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGroupSelected = (group: string) => setGroupSelected(group);

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigation.navigate("exercise", { exerciseId });
  };

  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível carregar os grupos musculares!",
      });
    }
  };

  const fetchExercisesByGroups = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(data);
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível carregar os exercícios!",
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

        {!groupSelected && (
          <VStack flex={1} alignItems="center" justifyContent="center">
            <Heading color="gray.300" fontSize="lg" fontFamily="heading">
              Escolha um grupo!
            </Heading>
          </VStack>
        )}

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercises}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(String(item.id))}
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
