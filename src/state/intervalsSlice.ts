import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type IntervalsState = {
  type: string;
}

const initialState: IntervalsState = {
  type: "today"
}

const intervalsSlice = createSlice({
  name: "intervals",
  initialState,
  reducers: {
    changeInterval: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    }
  }
});

export const { changeInterval } = intervalsSlice.actions;
export const selectIntervalsType = (state: RootState) => state.intervals.type;
export default intervalsSlice.reducer;