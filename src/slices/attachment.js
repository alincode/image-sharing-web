import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AttachmentService from "../services/attachment";
import UserLikeService from "../services/userLike";
import { setMessage } from "./message";

export const like = createAsyncThunk(
  "attachment/like",
  async (attachmentId, thunkAPI) => {
    try {
      const data = await UserLikeService.like(attachmentId);
      return { attachment: data };
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unlike = createAsyncThunk(
  "attachment/unlike",
  async (attachmentId, thunkAPI) => {
    try {
      const data = await UserLikeService.unlike(attachmentId);
      return { attachment: data };
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetch = createAsyncThunk("attachments/fetch", async () => {
  const res = await AttachmentService.fetchAttachments();
  return res;
});

export const create = createAsyncThunk(
  "attachment/create",
  async ({ file, description }, thunkAPI) => {
    try {
      const attachment = await AttachmentService.createAttachment(
        file,
        description
      );
      thunkAPI.dispatch(
        setMessage(`${attachment.sourceFilename} upload successful`)
      );
    } catch (error) {
      const message = error.response.data.message;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = { attachments: [], total: 0 };

const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  extraReducers: {
    [fetch.fulfilled]: (state, action) => {
      return action.payload;
    },
    [create.fulfilled]: (state, action) => {},
    [like.fulfilled]: (state, action) => {},
    [unlike.fulfilled]: (state, action) => {},
  },
});

export default attachmentSlice.reducer;
