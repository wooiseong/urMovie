import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetJournalsQuery } from "src/generated/graphql";

type Journal = NonNullable<GetJournalsQuery["journals"]>[number];

export interface JournalState {
  selectedJournal: Journal | null;
}

const initialState: JournalState = {
  selectedJournal: null,
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setSelectedJournal: (state, action: PayloadAction<Journal | null>) => {
      state.selectedJournal = action.payload;
    },
  },
});

export const { setSelectedJournal } = journalSlice.actions;
export default journalSlice.reducer;
