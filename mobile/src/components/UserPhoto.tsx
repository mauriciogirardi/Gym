import { Image, IImageProps, Skeleton, Icon, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type UserPhotoProps = IImageProps & {
  size: number;
  isLoading?: boolean;
  hasAvatar?: boolean;
  skeletonStyles?: {
    mt?: number;
    mb?: number;
  };
};

export function UserPhoto({
  size,
  isLoading = false,
  skeletonStyles,
  hasAvatar = false,
  ...rest
}: UserPhotoProps) {
  return (
    <>
      {isLoading ? (
        <Skeleton
          w={size}
          h={size}
          rounded="full"
          startColor="gray.500"
          endColor="gray.600"
          {...skeletonStyles}
        />
      ) : hasAvatar ? (
        <Image
          h={size}
          w={size}
          rounded="full"
          borderWidth={2}
          borderColor="gray.400"
          {...rest}
        />
      ) : (
        <Box
          w={size}
          h={size}
          borderColor="gray.400"
          borderWidth={2}
          rounded="full"
          alignItems="center"
          mr={2}
          justifyContent="center"
          bg="gray.700"
        >
          <Icon as={MaterialIcons} name="person" size={10} />
        </Box>
      )}
    </>
  );
}
