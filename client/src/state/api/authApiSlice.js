import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
    }),
    login: build.mutation({
      query: (body) => {
        return {
          url: "authentication",
          method: "POST",
          body,
        };
      },
    }),
    addExperience: build.mutation({
      query: (body) => {
        return {
          url: "experiences",
          method: "POST",
          body,
        };
      },
    }),
    getUser: build.query({
      query: (userId) => `users/${userId}`,
    }),
    getExperienceByUser: build.query({
      query: (userId) => `experiences?userId=${userId}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAddExperienceMutation,
  useGetUserQuery,
  useGetExperienceByUserQuery,
} = authApiSlice;
