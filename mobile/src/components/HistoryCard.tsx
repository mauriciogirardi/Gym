import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, Text, VStack } from "native-base";

interface HistoryCardProps {
  history: HistoryDTO;
}

export function HistoryCard({ history }: HistoryCardProps) {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5} flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
          fontFamily="heading"
        >
          {history.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {history.hour}
      </Text>
    </HStack>
  );
}
