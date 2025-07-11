import type { IBook } from "../features/book/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/books`,
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/",
      providesTags: ["Book"],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<
      IBook,
      { id: string; changes: Partial<IBook> }
    >({
      query: ({ id, changes }) => ({
        url: `/${id}`,
        method: "PUT",
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
