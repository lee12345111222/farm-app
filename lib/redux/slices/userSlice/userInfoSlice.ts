/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateState: (state, action: PayloadAction<Record<string, any>>) => {
      // state.value += action.payload;
      const obj = action.payload
      
      state.user = obj.user
    },
  },

});

/* Types */
export interface UserSliceState {
  user: Record<string, any>;
}
