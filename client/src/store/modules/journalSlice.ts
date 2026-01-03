import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetJournalsQuery } from "src/generated/graphql";

type Journal = NonNullable<GetJournalsQuery["journals"]["journals"]>[number];

export interface DraftJournal {
  movieName: string;
  content: any;
}

export interface JournalState {
  selectedJournal: Journal | null;
  draftJournal: DraftJournal | null;
  viewMode: "grid" | "list";
}

const initialState: JournalState = {
  selectedJournal: null,
  draftJournal: null,
  viewMode: "grid",
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setSelectedJournal: (state, action: PayloadAction<Journal | null>) => {
      state.selectedJournal = action.payload;
    },
    setDraftJournal: (state, action: PayloadAction<DraftJournal | null>) => {
      state.draftJournal = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setSelectedJournal, setDraftJournal, setViewMode } =
  journalSlice.actions;
export default journalSlice.reducer;
