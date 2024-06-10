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
    getJobById: build.query({
      query: (jobId) => `jobs?id=${jobId}`,
      transformResponse: (response) => response.data,
    }),
    getFilterJobs: build.query({
      query: ({ from, to, type, city, homeOffice }) => {
        let queryString = `jobs?`;
        if (from || from !== "") {
          queryString += `salaryFrom[$gt]=${Number(from)}&`;
        }
        if (to || to !== "") {
          queryString += `salaryTo[$lt]=${Number(to)}&`;
        }
        if (type || type !== "") {
          queryString += `type=${type}&`;
        }
        if (city || city !== "") {
          queryString += `city=${city}&`;
        }
        queryString += `homeOffice=${Boolean(homeOffice)}&`;
        return queryString;
      },
      transformResponse: (response) => response.data,
    }),
    applyForJob: build.mutation({
      query: (body) => {
        return {
          url: "applicants",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterJobMutation,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetFilterJobsQuery,
  useApplyForJobMutation,
} = jobApi;
