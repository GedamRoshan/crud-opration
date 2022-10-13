import { createSlice } from "@reduxjs/toolkit";


export interface MemberState {
  memberlist: IMemberList[];
}

const initialState: MemberState = {
  memberlist: [],
};

export interface IMemberList {
  id: string;
  fName: string;
  lName: string;
  email: string;
  state: string;
  gender: string;
}
export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    addMember: (state, action: any) => {
      state.memberlist.push(action.payload);
    },
    deleteMember: (state, action: any) => {
      state.memberlist.splice(action.payload, 1);
    },
    editMember: (state, action: any) => {
      const updatedData = action.payload;
      const newState = state.memberlist.map((obj) =>
        obj.id === action.payload.id
          ? {
              ...obj,
              fName: updatedData.fName,
              lName: updatedData.lName,
              email: updatedData.email,
              gender: updatedData.gender,
              state: updatedData.state,
            }
          : obj
      );
      state.memberlist = newState;
    },
  },
});

export const { addMember, deleteMember, editMember } = memberSlice.actions;

export default memberSlice.reducer;
