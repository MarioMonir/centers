import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { apiSlice } from "../API/api";
// import logger from "redux-logger";
import authSlice from "./Slices/auth.slice";
import Toast from "react-native-toast-message";

// ========================================================

/**
 * RTK Error Hanlder
 *
 *  RTK Query uses `createAsyncThunk` fromredux-toolkit
 *  under the hood, so we'reable to utilize these matchers!
 */
const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let message = "Something went wrong";

    if (action?.payload?.data?.message) {
      message = action?.payload?.data?.message;
    } else if (action?.payload?.error) {
      message = action?.payload?.error;
    }

    Toast.show({ type: "error", text1: "😔  " + message });
  }
  return next(action);
};

// ========================================================

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // ---------------------------------------------------------

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(rtkQueryErrorLogger);
    // .concat(logger);
  },
});

// ===========================================================

export default store;
