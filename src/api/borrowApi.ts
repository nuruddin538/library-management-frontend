import type { IBorrow, IBorrowSummary } from "../features/borrow/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/borrow" }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      IBorrow,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, ...body }) => ({
        url: `/${bookId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Borrow"],
    }),
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
