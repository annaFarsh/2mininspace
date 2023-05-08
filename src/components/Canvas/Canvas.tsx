import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { spaceship, asteroid, space } from '../../assests/gameObjects';
import {
  goLeft,
  goRight,
  setTimestamp,
  addAsteroid,
  goAsteroid,
  goBackground,
  addBackground,
  fly,
} from '../../store/spaceshipSlice';
import { inRad } from '../../assests/inRad';
import { store } from '../../store';

import classes from './Canvas.module.css';

const Canvas: FC = () => {
  const widthScreen = window.innerWidth;
  const heightScreen = window.innerHeight;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'KeyA') {
      dispatch(goLeft());
      dispatch(fly());
    } else if (event.code === 'KeyD') {
      dispatch(goRight());
      dispatch(fly());
    }
  };

  const animate = (context: CanvasRenderingContext2D) => {
    dispatch(fly());
    const state = store.getState();
    const stateSpaceship = state.spaceship;
    // context.fillStyle = 'rgba(0, 0, 0, 0.4)';
    // context.fillRect(0, 0, widthScreen, heightScreen);
    // for (let i = 0; i < 150; i++) {
    //   const newStar = star();
    //   dispatch(addStar({ newStar }));
    // }
    // for (let i = 0; i < stateSpaceship.stars.length; i++) {
    //   context.fillStyle = `rgba(255,255,255,${stateSpaceship.stars[i].opacity})`;
    //   context.fillRect(stateSpaceship.stars[i].x, stateSpaceship.stars[i].y, 1, 1);
    //   dispatch(goStar(i));
    //   if (stateSpaceship.stars[i].y === 0) {
    //     dispatch(repeatStars());
    //   }
    // }
    for (let i = 0; i < stateSpaceship.background.length; i++) {
      context.drawImage(
        space,
        stateSpaceship.background[i].x,
        stateSpaceship.background[i].y,
        widthScreen,
        heightScreen,
      );
      dispatch(goBackground(i));
      if (stateSpaceship.background[i].y === 0) {
        const repeatBackground = { x: 0, y: -heightScreen };
        dispatch(addBackground({ repeatBackground }));
      }
    }
    for (let i = 0; i < stateSpaceship.asteroids.length; i++) {
      context.drawImage(asteroid, stateSpaceship.asteroids[i].x, stateSpaceship.asteroids[i].y);
      dispatch(goAsteroid(i));
      if (stateSpaceship.asteroids[i].y === 300) {
        const randomX = Math.floor(Math.random() * widthScreen);
        const newAsteroid = { x: randomX, y: -200 };
        dispatch(addAsteroid({ newAsteroid }));
      }
    }
    context.save();
    context.translate(stateSpaceship.spaceshipXpos + stateSpaceship.widthSpaceship / 2, stateSpaceship.spaceshipYpos + stateSpaceship.heightSpaceship / 2);
    context.rotate(inRad(stateSpaceship.currentDegrees));
    context.translate(-(stateSpaceship.spaceshipXpos + stateSpaceship.widthSpaceship / 2), -(stateSpaceship.spaceshipYpos + stateSpaceship.heightSpaceship / 2));
    context.drawImage(
      spaceship,
      stateSpaceship.spaceshipXpos,
      stateSpaceship.spaceshipYpos,
      stateSpaceship.widthSpaceship,
      stateSpaceship.heightSpaceship,
    );
    context.restore();
    window.requestAnimationFrame(() => animate(context));
    dispatch(setTimestamp());
  };
  useEffect(() => {
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    canvas.current.focus();
    if (context) {
      window.requestAnimationFrame(() => animate(context));
    }
    return () => {
      cancelAnimationFrame(window.requestAnimationFrame(() => animate(context)));
    };
  }, []);

  return (
    <canvas
      onKeyDown={onKeyDown}
      ref={canvas}
      tabIndex={0}
      width={widthScreen}
      height={heightScreen}
      className={classes.canvas}
    />
  );
};
export default Canvas;
