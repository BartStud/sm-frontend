import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";

export interface ProfileData {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface UpdateUserPayload {
  user_id: string;
  data: Partial<ProfileData>;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["CurrentUser"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ProfileData, void>({
      query: () => `users/current`,
      providesTags: ["CurrentUser"],
    }),
    getUserById: builder.query<ProfileData, string>({
      query: (userId) => `users/${userId}`,
    }),
    updateUser: builder.mutation<ProfileData, UpdateUserPayload>({
      query: ({ data }) => ({
        url: `users/current`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    // updateUser: builder.mutation<ProfileData, UpdateUserPayload>({
    //   query: ({ user_id, data }) => ({
    //     url: `users/${user_id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["CurrentUser"],
    // }),
    // searchUsers: builder.query<SearchHit[], string>({
    //   query: (query) => `users/search?query=${encodeURIComponent(query)}`,
    // }),
    uploadProfilePicture: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/users/current/picture",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["CurrentUser"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadProfilePictureMutation,
} = userApi;
