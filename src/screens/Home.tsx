import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useState } from "react";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

const groupsData = ["Ombros", "Bíceps", "Tríceps", "Costas", "Pernas"];

export function Home() {
  const [groupSelected, setGroupSelected] = useState("");
  const [groups, setGroups] = useState(groupsData);
  const [exercises, setExercises] = useState(["Ombros", "Bíceps", "Tríceps"]);

  const handleGroupSelected = (group: string) => setGroupSelected(group);

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
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(id) => id}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
