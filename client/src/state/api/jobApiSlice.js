import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const jobApi = createApi({
  reducerPath: "jobs",
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
    registerJob: build.mutation({
      query: (body) => {
        return {
          url: "jobs/1",
          method: "POST",
          body,
        };
      },
    }),
    getAllJobs: build.query({
      query: () => "jobs",
      transformResponse: (response) => response.data,
    }),
    getFilterJobs: build.query({
      query: ({ from, to, type, city, homeOffice }) => {
        let queryString = `jobs?`;
        if (from) {
          queryString += `salaryFrom[$gt]=${Number(from)}&`;
        }
        if (to) {
          queryString += `salaryTo[$lt]=${Number(to)}&`;
        }
        if (type) {
          queryString += `type=${type}&`;
        }
        if (city) {
          queryString += `city=${city}&`;
        }
        queryString += `homeOffice=${Boolean(homeOffice)}&`;
        return queryString;
      },
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useRegisterJobMutation,
  useGetAllJobsQuery,
  useGetFilterJobsQuery,
} = jobApi;
