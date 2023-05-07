import { createSlice } from '@reduxjs/toolkit';

import { sinAndCos } from '../assests/sinAndCos';

const spaceshipSlice = createSlice({
  name: 'spaceship',
  initialState: {
    widthSpaceship: 60,
    heightSpaceship: 60,
    background: [{ x: 0, y: 0 }],
    asteroids: [{ x: 0, y: 0 }],
    spaceshipXpos: 500,
    spaceshipYpos: 600,
    rotationXinRight: 0,
    rotationYinRight: 0,
    rotationXinLeft: 0,
    rotationYinLeft: 0,
    currentDegrees: 0,
    speed: 0.5,
    delta: 1,
    timestamp: 0,
    speedAsteroids: 0.5,
    stars: [{x: 1, y: 2, opacity: 0.1}],
    speedStars: 0.5,
  },
  reducers: {
    goLeft(state) {
      state.currentDegrees -= 5;
      if (state.currentDegrees === -360) {
        state.currentDegrees = 0;
      }
      state.rotationXinRight = state.rotationXinLeft - 300 * sinAndCos(state.currentDegrees).cos;
      state.rotationYinRight = state.rotationYinLeft - 300 * sinAndCos(state.currentDegrees).cos;
      state.spaceshipXpos += state.speed * sinAndCos(state.currentDegrees).sin;
    },
    goRight(state) {
      state.currentDegrees += 5;
      if (state.currentDegrees === 360) {
        state.currentDegrees = 0;
      }
      state.spaceshipYpos -= state.speed * sinAndCos(state.currentDegrees).cos;
    },
    translateAndRotateRight(state) {
      state.spaceshipXpos += state.widthSpaceship * 3;
      state.spaceshipYpos += state.heightSpaceship;
    },
    setTimestamp(state) {
      state.timestamp = Date.now();
      if (state.timestamp !== 0) {
        state.delta = Date.now() - state.timestamp;
      }
    },
    addAsteroid(state, action) {
      state.asteroids = [...state.asteroids, action.payload.newAsteroid];
    },
    goAsteroid(state, action) {
      state.asteroids[action.payload].y += state.speedAsteroids;
    },
    goBackground(state, action) {
      state.background[action.payload].y += state.speedAsteroids;
    },
    addBackground(state, action) {
      state.background = [...state.background, action.payload.repeatBackground];
    },
    // addStar(state, action) {
    //   state.stars = [...state.stars, action.payload.newStar];
    // },
    // goStar(state, action) {
    //   state.stars[action.payload].y += state.speedAsteroids;
    // },
    // repeatStars(state) {
    //   const newObj = { y: window.innerHeight-1 };
    //   state.stars = [...state.stars.map((objStar) => Object.assign(newObj, objStar))];
    // },
  },
});
export default spaceshipSlice.reducer;
export const { goLeft, goRight, setTimestamp, addAsteroid, goAsteroid, goBackground, addBackground } = spaceshipSlice.actions;
