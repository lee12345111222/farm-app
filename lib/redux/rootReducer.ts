/* Instruments */
import { counterSlice } from "./slices";
import { userSlice } from "./slices/userSlice";

export const reducer = {
  counter: counterSlice.reducer,
  userSlice: userSlice.reducer
};
