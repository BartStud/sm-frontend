import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../apiBase";
import { Chat, ChatMessage } from "./Chat.types";
import { User } from "../user/User.types";

interface ChatOrCreateResponse {
  chat: Chat;
  detail: string;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery,
  tagTypes: ["Chats"],
  endpoints: (builder) => ({
    fetchChats: builder.query<Chat[], { currentUserId: string | null }>({
      query: () => "/chat/chats/",
      transformResponse: (response: Chat[], meta, arg) => {
        const { currentUserId } = arg;
        return response.map((chat) => ({
          ...chat,
          partner: currentUserId
            ? chat.participants.find(
                (participant) => participant.id !== currentUserId
              ) ?? null
            : null,
        }));
      },
      providesTags: ["Chats"],
    }),
    createChat: builder.mutation<Chat, { userId: string }>({
      query: ({ userId }) => ({
        url: "/chat/chats/",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Chats"],
    }),
    fetchChatHistory: builder.query<ChatMessage[], { chatId: string }>({
      query: ({ chatId }) => `/chat/chats/${chatId}/messages`,
      providesTags: (result, error, { chatId }) => [
        { type: "Chats", id: chatId },
      ],
    }),
    getOrCreateChat: builder.mutation<
      ChatOrCreateResponse,
      { otherUserId: string }
    >({
      query: ({ otherUserId }) => ({
        url: `/chat/chats/get-or-create/${otherUserId}`,
        method: "GET",
      }),
      transformResponse: (rawResult: any, _, arg): ChatOrCreateResponse => {
        const { otherUserId } = arg;
        return {
          ...rawResult,
          chat: {
            ...rawResult.chat,
            partner:
              rawResult.chat.participants.find(
                (participant: User) => participant.id === otherUserId
              ) ?? null,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchChatsQuery,
  useCreateChatMutation,
  useFetchChatHistoryQuery,
  useGetOrCreateChatMutation,
} = chatApi;
