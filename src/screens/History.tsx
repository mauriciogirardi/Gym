import { Heading, SectionList, Text, VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    { title: "18.03.23", data: ["Puxada Frontal", "Remada Unilateral"] },
    { title: "19.03.23", data: ["Puxada Frontal", "Remada Unilateral"] },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercício" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 ? { flex: 1, justifyContent: "center" } : {}
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text color="gray.300" textAlign="center" fontSize="md">
            Não há exercícios registrados ainda.{"\n"} Vamos fazer exercícios
            hoje?
          </Text>
        )}
        px={6}
      />
    </VStack>
  );
}
