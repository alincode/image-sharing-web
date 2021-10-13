import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AttachmentService from "../services/attachment";
import { setMessage } from "./message";

export const fetch = createAsyncThunk(
  "attachment/fetch",
  async ({}, thunkAPI) => {
    try {
      const attachments = await AttachmentService.fetchAttachment();
      return { attachments };
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const create = createAsyncThunk(
  "attachment/create",
  async ({ file, description }, thunkAPI) => {
    try {
      const attachment = await AttachmentService.createAttachment(
        file,
        description
      );
      thunkAPI.dispatch(setMessage("upload successful"));
      return attachment;
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = { attachments: [] };

const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  extraReducers: {
    [fetch.fulfilled]: (state, action) => {
      console.log("=== fetchAttachment slices ===");
    },
    [create.fulfilled]: (state, action) => {
      console.log("=== createAttachment slices ===");
    },
  },
});

export default attachmentSlice.reducer;
