import { createSlice } from "@reduxjs/toolkit";

// =====================================================================

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    email: null,
    id: null,
    name: null,
    permission: null,
    userType: null,
    info: null,
    updatedAt: null,
    createdAt: null,
  },
};

// =====================================================================

const reducers = {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setAuthUser: (state, action) => ({ ...state, ...action.payload }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setAccesToken: (state, action) => ({ ...state, accessToken: action.payload }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  setUser: (state, action) => ({ ...state, user: { ...action.payload } }),

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  resetAuthUser: () => initialState,

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
};

// =====================================================================

const auhthSlice = createSlice({ name: "auth", initialState, reducers });

// =====================================================================

export const { setAuthUser, setAccesToken, setUser, resetAuthUser } =
  auhthSlice.actions;

// =====================================================================

export default auhthSlice;
