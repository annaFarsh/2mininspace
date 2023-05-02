import { createSlice } from '@reduxjs/toolkit';

const spaceshipSlice = createSlice({
  name: 'spaceship',
  initialState: {
    spaceshipX: 0,
    spaceshipY: 0,
    velocityX: 0,
  },
  reducers: {
    goLeft(state, action) {
      state.velocityX -= action.payload;
    },
    goRight(state, action) {
      state.velocityX += action.payload;
    },
  },
});
export default spaceshipSlice.reducer;
export const { goLeft, goRight } = spaceshipSlice.actions;