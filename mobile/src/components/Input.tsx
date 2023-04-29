import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

export interface InputProps extends IInputProps {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        fontSize="md"
        borderColor="gray.700"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.700",
          borderColor: "green.500",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage m={0} pt={1}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
