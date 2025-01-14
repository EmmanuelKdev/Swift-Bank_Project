/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  items: any[]; // Replace `any` with your GraphQL data type
}

const initialState: DataState = {
  items: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setGraphQLData: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setGraphQLData } = dataSlice.actions;
export default dataSlice.reducer;
