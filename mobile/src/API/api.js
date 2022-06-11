import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../Config/config";
import endpoints from "./api.queries";

// ==========================================================

export const apiSlice = createApi({
  reducerPath: "api",

  // -------------------------------------

  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      console.log("query ", endpoint);

      const accessToken = getState()?.auth?.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints,
});

// ==========================================================

export const {
  useCreateMutation,
  useGetListQuery,
  useGetOneQuery,
  useUpdateMutation,
  useDeleteOneQuery,
  useLoginMutation,
  useRegisterMutation,
  useFredyQuery,
  useLazyMeQuery,
  useSearchQuery,
} = apiSlice;
