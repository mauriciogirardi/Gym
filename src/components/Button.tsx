import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  const isVariantOutline = variant === 'outline'

  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={isVariantOutline ? 'transparent' : 'green.700'}
      borderWidth={isVariantOutline ? 1 : 0}
      borderColor="green.500"
      _pressed={{ bg: isVariantOutline ? 'gray.500' : 'green.500' }}
      {...rest}
    >
      <Text
        color={isVariantOutline ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}
