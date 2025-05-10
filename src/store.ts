import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/user/userSlice";
import chatReducer from "./features/chat/chatSlice";
import { chatApi } from "./features/chat/chatApi";
import { userApi } from "./features/user/userApi";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    chat: chatReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
