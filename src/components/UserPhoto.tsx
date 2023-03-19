import { Image, IImageProps, Skeleton } from "native-base";

type UserPhotoProps = IImageProps & {
  size: number;
  isLoading?: boolean;
  skeletonStyles?: {
    mt?: number;
    mb?: number;
  };
};

export function UserPhoto({
  size,
  isLoading = false,
  skeletonStyles,
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
      ) : (
        <Image
          h={size}
          w={size}
          rounded="full"
          borderWidth={2}
          borderColor="gray.400"
          {...rest}
        />
      )}
    </>
  );
}
