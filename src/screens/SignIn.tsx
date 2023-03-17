import { Center, Heading, Image, ScrollView, Text, VStack } from 'native-base'

import backgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={6} pb={4}>
        <Image
          source={backgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center mt={8}>
          <Heading mb={6} fontFamily="heading" color="gray.100">
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" mt={2} />

          <Text color="gray.200" fontSize="md" mt={24}>
            Ainda não tem acesso?
          </Text>
          <Button title="Criar conta" variant="outline" mt={2} />
        </Center>
      </VStack>
    </ScrollView>
  )
}