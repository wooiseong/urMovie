import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeQuery, User } from "src/generated/graphql";

export interface UserState {
  id: string | null;
  username: string;
  role: "admin" | "user" | "premiumUser";
  avatar: string | null;
  isLogin: boolean;
}

const initialState: UserState = {
  id: null,
  username: "",
  role: "user",
  avatar: null,
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<NonNullable<MeQuery["me"]>>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role as UserState["role"];
      state.avatar = action.payload.avatar ?? null;
      state.isLogin = !!action.payload.id;
    },
    setUserRole: (
      state,
      action: PayloadAction<"admin" | "user" | "premiumUser">
    ) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = null;
      state.username = "";
      state.role = "user";
      state.avatar = null;
    },
  },
});

export const { setUser, setUserRole, logout } = userSlice.actions;
export default userSlice.reducer;
