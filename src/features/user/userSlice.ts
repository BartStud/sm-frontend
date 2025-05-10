import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

const initialState: User = {
  id: "",
  role: null,
  token: null,
  profile: {},
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<Partial<User>>) {
      return { ...state, ...action.payload };
    },
    setUserProfile(state, action: PayloadAction<User["profile"]>) {
      state.profile = action.payload;
    },
  },
});

export const { setCurrentUser, setUserProfile } = currentUserSlice.actions;
export default currentUserSlice.reducer;
