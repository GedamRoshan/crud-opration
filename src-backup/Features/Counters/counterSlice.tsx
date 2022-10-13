import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  memberlist: IMemberList[];
}


const initialState: CounterState = {
  value: 0,
  memberlist: [],
};
 interface IMemberList{
    firstName:string;
    lastName:string;
    email:string;
    state:string;
    gender:string;
}
export const counterSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    addMember: (state, action: any) => {
      state.memberlist.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addMember } = counterSlice.actions;

export default counterSlice.reducer;
