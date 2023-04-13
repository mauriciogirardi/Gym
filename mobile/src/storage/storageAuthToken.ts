import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export const storageAuthTokenSave = async (token: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
  } catch (error) {
    throw error;
  }
};

export const storageAuthTokenGet = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    return token;
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
