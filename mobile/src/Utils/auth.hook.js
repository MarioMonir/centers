import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../Store/redux.hooks";
import {
  setAuthUser,
  resetAuthUser,
  setAccesToken,
} from "../Store/Slices/auth.slice";
import { useLazyMeQuery } from "../API/api";

// ----------------------------------------------------------------

export const useAuthMe = () => {
  const isAuthenticated = useAppSelector((state) => !!state?.auth?.user?.id);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const [getMe] = useLazyMeQuery();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const authMe = async () => {
    if (isAuthenticated) return true;

    setLoading(true);
    const savedAccessToken = await AsyncStorage?.getItem("accessToken");
    dispatch(setAccesToken(savedAccessToken));

    if (!savedAccessToken) {
      setLoading(false);
      return false;
    }

    const res = getMe().unwrap();

    if (res?.user && res?.accessToken) {
      const { user, accessToken } = res;
      await AsyncStorage.setItem("accessToken", accessToken);
      dispatch(setAuthUser({ accessToken, user }));
    }

    setLoading(false);
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    dispatch(resetAuthUser());
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return { isAuthenticated, authMe, loading, logout };
};
