import { Input as NativeBaseInput, IInputProps } from 'native-base'

interface InputProps extends IInputProps {}

export function Input({ ...rest }: InputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      fontSize="md"
      borderColor="gray.700"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}
