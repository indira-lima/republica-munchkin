import { useCallback } from "react";
import * as SecureStorage from "expo-secure-store";
import useCancelablePromise from "./useCancelablePromise";

const appPrefixStorage = "__rep_munchkin";

const useSecureStorage = () => {
  const { cancelablePromise } = useCancelablePromise();

  /** Salva dados sensíveis no storage com encriptação */
  const secureSave = useCallback(async (key: string, value: any) => {
    let strValue = value;
    if (typeof value !== "string") strValue = JSON.stringify(value);

    await cancelablePromise(
      SecureStorage.setItemAsync(`${appPrefixStorage}_${key}`, strValue)
    );
  }, []);

  /** Remove dados do storage */
  const removeFromStorage = useCallback(async (key: string) => {
    await cancelablePromise(
      SecureStorage.deleteItemAsync(`${appPrefixStorage}_${key}`)
    );
  }, []);

  /** Busca dados do storage */
  const getFromStorage = useCallback(async (key: string) => {
    const value = await cancelablePromise(
      SecureStorage.getItemAsync(`${appPrefixStorage}_${key}`)
    );

    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  }, []);

  return {
    secureSave,
    removeFromStorage,
    getFromStorage,
  };
};

export default useSecureStorage;
