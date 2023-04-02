import { useToast } from "native-base";

interface MessageProps {
  title: string;
  type?: "success" | "error" | "warning";
}

export const message = ({ title, type = "success" }: MessageProps) => {
  const toast = useToast();

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
