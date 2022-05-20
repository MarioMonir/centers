import { createContext, useState, useContext } from "react";

// ----------------------------------------------

export const authContext = createContext({});

// ----------------------------------------------

export const useCreateAuthContext = () => {
  const [auth, setAuth] = useState({
    tokens: {
      accessToken: null,
      refreshToken: null,
    },
    user: null,
  });

  return { auth, setAuth };
};

// ----------------------------------------------

export const useAuthContext = () => {
  const { auth, setAuth } = useContext(authContext);
  const isAuthenticated = !!(auth?.accessToken && user);
  return { auth, setAuth, isAuthenticated };
};

// ----------------------------------------------
