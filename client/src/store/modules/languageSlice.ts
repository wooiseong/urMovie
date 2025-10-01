import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LangaugeState {
  lang: "zh" | "en";
}

const initialState: LangaugeState = {
  lang: "zh",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"zh" | "en">) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
