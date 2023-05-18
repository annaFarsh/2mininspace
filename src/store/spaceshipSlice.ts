import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDegreesRockets } from '../assests/getCurrentDegreesRockets';
import { sinAndCos } from '../assests/sinAndCos';

const spaceshipSlice = createSlice({
  name: 'spaceship',
  initialState: {
    widthSpaceship: 60,
    heightSpaceship: 60,
    background: [{ x: 0, y: 0 }],
    asteroids: [{ x: 0, y: 0 }],
    rockets: [{ x: 200, y: -200 }],
    asteroidsWidth: 80,
    asteroidsHeight: 80,
    spaceshipXpos: 600,
    spaceshipYpos: 1000,
    spaceshipSpeedX: 3,
    spaceshipSpeedY: 3,
    currentDegrees: 0,
    currentDegreesRockets: 0,
    speed: 3,
    delta: 1,
    timestamp: 0,
    speedAsteroids: 0.5,
    speedRockets: 2,
    rocketsWidth: 40,
    rocketsHeight: 60,
    stars: [{ x: 1, y: 2, opacity: 0.1 }],
    speedStars: 0.5,
    gameOver: false,
    playAgain: false,
    mousePosition: { x: 0, y: 0 },
    timeRockets: 30,
  },
  reducers: {
    fly(state) {
      state.mousePosition = { x: 0, y: 0 };
      state.spaceshipYpos -=
        state.spaceshipSpeedY * sinAndCos(state.currentDegrees).cos;
      state.spaceshipXpos +=
        state.spaceshipSpeedX * sinAndCos(state.currentDegrees).sin;
    },
    hunt(state, action) {
      // const coordinatesSpaceship = { x: state.spaceshipXpos, y: state.spaceshipYpos };
      // const { x, y } = getPositionRocket(
      //   state.rockets[action.payload],
      //   coordinatesSpaceship,
      //   state.timeRockets,
      // );
      state.currentDegreesRockets = getCurrentDegreesRockets(
        state.spaceshipXpos,
        state.spaceshipYpos,
        state.rockets[0],
      );
      state.rockets[action.payload].x -= state.speedRockets * sinAndCos(state.currentDegreesRockets).sin;
      state.rockets[action.payload].y += state.speedRockets * sinAndCos(state.currentDegreesRockets).cos;
      if(state.rockets[0].y >= state.spaceshipYpos){
        state.currentDegreesRockets = -180;
        //state.currentDegreesRocketsInRad *= Math.PI;
        state.speedRockets = state.spaceshipSpeedY;
        state.rockets[action.payload].y += (state.speedRockets + 2) * sinAndCos(state.currentDegreesRockets).cos;
        state.rockets[action.payload].x -= state.speedRockets * sinAndCos(state.currentDegreesRockets).sin;
      }
    },
    goLeft(state) {
      state.currentDegrees -= 5;
      if (state.currentDegrees === -360) {
        state.currentDegrees = 0;
      }
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
    gameOver(state) {
      state.gameOver = true;
    },
    getMousePosition(state, action) {
      state.mousePosition = action.payload;
      if (
        state.mousePosition.x >= window.innerWidth / 2 - 300 &&
        state.mousePosition.x <= window.innerWidth / 2 + 300 &&
        state.mousePosition.y >= window.innerHeight / 2 - 300 &&
        state.mousePosition.y <= window.innerHeight / 2 + 300
      ) {
        state.gameOver = false;
        state.playAgain = true;
      }
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
export const {
  goLeft,
  goRight,
  setTimestamp,
  addAsteroid,
  goAsteroid,
  goBackground,
  addBackground,
  fly,
  gameOver,
  getMousePosition,
  hunt,
} = spaceshipSlice.actions;
