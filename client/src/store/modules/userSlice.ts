import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userRole {
  role: "admin" | "user" | "premiumUser";
}

const initialState: userRole = {
  role: "admin",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (
      state,
      action: PayloadAction<"admin" | "user" | "premiumUser">
    ) => {
      state.role = action.payload;
    },
  },
});

export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;
