import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { HistoryGroupDTO } from "@dtos/HistoryGroupDTO";
import { ScreenHeader } from "@components/ScreenHeader";
import { messageError } from "@utils/messageError";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { api } from "@services/axios";

export function History() {
  const toast = useToast();
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [exercises, setExercises] = useState<HistoryGroupDTO[]>([]);

  const fetchHistory = async () => {
    try {
      setIsLoadingHistory(true);
      const { data } = await api.get(`/history`);
      setExercises(data);
    } catch (error) {
      messageError({
        toast,
        error,
        message: "Não foi possível carregar o histórico!",
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const renderHeader = (title: string) => (
    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
      {title}
    </Heading>
  );

  const renderListEmpty = () => (
    <Text color="gray.300" textAlign="center" fontSize="md">
      Não há exercícios registrados ainda.{"\n"} Vamos fazer exercícios hoje?
    </Text>
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercício" />

      {isLoadingHistory ? (
        <Loading />
      ) : (
        <SectionList
          px={6}
          sections={exercises}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderListEmpty}
          renderItem={({ item }) => <HistoryCard history={item} />}
          renderSectionHeader={({ section }) => renderHeader(section.title)}
          contentContainerStyle={
            exercises.length === 0 ? { flex: 1, justifyContent: "center" } : {}
          }
        />
      )}
    </VStack>
  );
}
