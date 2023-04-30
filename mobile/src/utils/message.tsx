import { IToastProps } from "native-base";

interface MessageProps {
  title: string;
  type?: "success" | "error" | "warning";
  toast: {
    show: (props: IToastProps) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
  };
}

export const message = ({ title, type = "success", toast }: MessageProps) => {
  const bg = {
    success: "green.500",
    error: "red.500",
    warning: "yellow.500",
  }[type];

  return toast.show({
    bg,
    title,
    placement: "top",
  });
};
