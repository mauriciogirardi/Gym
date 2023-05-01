import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export const storageAuthTokenSave = async ({
  refresh_token,
  token,
}: StorageAuthTokenProps) => {
  try {
    await AsyncStorage.setItem(
      AUTH_TOKEN_STORAGE,
      JSON.stringify({ token, refresh_token })
    );
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenGet = async () => {
  try {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    const { refresh_token, token }: StorageAuthTokenProps = response
      ? JSON.parse(response)
      : {};

    return {
      token,
      refresh_token,
    };
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenRemove = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    throw error;
  }
};
