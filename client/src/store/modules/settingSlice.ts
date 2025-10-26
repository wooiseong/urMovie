import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingState {
  theme: "light" | "dark";
  lang: "zh-TW" | "en";
}

export type Theme = SettingState["theme"];
export type Language = SettingState["lang"];

// set language according to localStorage or browser language
// Currently, only 'zh-TW' (Traditional Chinese) and 'en' (English) are supported
const initialLang =
  (localStorage.getItem("i18nextLang") === "zh-CN" ||
  localStorage.getItem("i18nextLang") === "zh-TW"
    ? "zh-TW"
    : localStorage.getItem("i18nextLang")) ||
  (navigator.language === "zh-TW" || navigator.language === "zh-CN"
    ? "zh-TW"
    : "en");

const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const initialState: SettingState = {
  theme: initialTheme as "light" | "dark",
  lang: initialLang as "zh-TW" | "en",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setLanguage: (state, action: PayloadAction<"zh-TW" | "en">) => {
      state.lang = action.payload;
      localStorage.setItem(
        "i18nextLang",
        action.payload === "zh-TW" ? "zh-TW" : "en"
      );
    },
  },
});

export const { setTheme, setLanguage } = settingSlice.actions;
export default settingSlice.reducer;
