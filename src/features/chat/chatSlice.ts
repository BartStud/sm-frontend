import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, Chat } from "../../types/Chat.types";

interface ChatState {
  chats: Chat[];
  selectedChat: Chat | null;
  messages: { [chatId: string]: ChatMessage[] };
  isOpen: boolean;
}

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  messages: {},
  isOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    selectChat(state, action: PayloadAction<Chat>) {
      state.selectedChat = action.payload;
    },
    addMessage(
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
    clearSelectedChat(state) {
      state.selectedChat = null;
    },
  },
});

export const {
  setChatOpen,
  setChats,
  selectChat,
  addMessage,
  clearSelectedChat,
} = chatSlice.actions;
export default chatSlice.reducer;
