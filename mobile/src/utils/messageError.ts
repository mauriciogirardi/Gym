import { IToastProps } from "native-base";
import { AppError } from "./AppError";

interface MessageErrorProps {
  error: unknown;
  message: string;
  toast: {
    show: (props: IToastProps) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
  };
}

export function messageError({ error, message, toast }: MessageErrorProps) {
  const isAppError = error instanceof AppError;
  const title = isAppError ? error.message : message;

  toast.show({
    title,
    placement: "top",
    bg: "red.500",
  });
}
