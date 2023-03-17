import { Spinner, ISpinnerProps, Center } from 'native-base'

interface LoadingProps extends ISpinnerProps {}

export function Loading({ ...rest }: LoadingProps) {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner size="lg" {...rest} color="green.500" />
    </Center>
  )
}
