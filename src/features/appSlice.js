import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
    roomInfo: null,
    players: null,
  },
  reducers: {
    setRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setPlayers: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setRoomInfo } = appSlice.actions;
export const { setRoomId } = appSlice.actions;
export const { setPlayers } = appSlice.actions;

export const selectRoomInfo = (state) => state.app.roomInfo;
export const selectRoomId = (state) => state.app.roomId;
export const selectPlayers = (state) => state.app.players;

export default appSlice.reducer;
