import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import attachmentReducer from "../slices/attachment";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  attachment: attachmentReducer,
};

export const store = configureStore({
  reducer,
  devTools: true,
});
