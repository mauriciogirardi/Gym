import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/axios";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export type AuthContextData = {
  user: UserDTO;
  signIn: (data: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const userAndTokenUpdate = (userData: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const storageUserAndTokenSave = async (
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) => {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refresh_token });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
      const { user, token, refresh_token } = data;

      if (user && token && refresh_token) {
        await storageUserAndTokenSave(user, token, refresh_token);
        userAndTokenUpdate(user, token);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const updateUserProfile = async (userUpdated: UserDTO) => {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
