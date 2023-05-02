import {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from './Canvas.module.css';
import { goLeft, goRight } from '../../store/spaceshipSlice';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { space, spaceship, asteroid } from '../../assests/gameObjects';
// type CanvasProps = DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
//   draw: (
//     context: CanvasRenderingContext2D,
//     image: HTMLImageElement,
//     dx: number,
//     dy: number,
//     width?: number,
//     height?: number,
//   ) => void;
// };

const Canvas: FC = ({ ...props }) => {
  const dispatch = useDispatch();
  const setKeys: Set<string> = new Set();

  const activeKeys = useRef(setKeys);

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const canvas2 = useRef<HTMLCanvasElement | null>(null);
  const refRequest = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [delta, setDelta] = useState(1);
  let velocityY = -2;
  const velocityX: number = useAppSelector((state) => state.spaceship.velocityX);
  const asteroids: any = [];
  asteroids[0] = {
    x: 0,
    y: -600,
  };
  const background: any = [];
  background[0] = {
    x: 0,
    y: -1,
  };

  function eventHandler(event: KeyboardEvent, resetVelocity: boolean) {
    if (event.code === 'KeyA') {
      if (resetVelocity === false) {
        if (activeKeys.current.has('KeyD')) {
          activeKeys.current.delete('KeyD');
          activeKeys.current.add('KeyA');
        } else if (activeKeys.current.has('up')) {
          activeKeys.current.delete('up');
        } else {
          activeKeys.current.add('KeyA');
        }
      }
    } else if (event.code === 'KeyD') {
      if (resetVelocity === false) {
        if (activeKeys.current.has('KeyA')) {
          activeKeys.current.delete('KeyA');
          activeKeys.current.add('KeyD');
        } else if (activeKeys.current.has('up')) {
          activeKeys.current.delete('up');
        } else {
          activeKeys.current.add('KeyD');
        }
      }
    }
  }

  function inRad(num: number) {
    return (num * Math.PI) / 180;
  }

  const animate = (context: CanvasRenderingContext2D, context2: CanvasRenderingContext2D) => {
    context.drawImage(space, 0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < background.length; i++) {
      context.drawImage(
        space,
        background[i].x,
        background[i].y,
        window.innerWidth,
        window.innerHeight,
      );
      background[i].y++;
      if (background[i].y === 0) {
        background.push({
          x: 0,
          y: -window.innerHeight,
        });
      }
    }
    for (let i = 0; i < asteroids.length; i++) {
      context.drawImage(asteroid, asteroids[i].x, asteroids[i].y);
      asteroids[i].y++;
      if (asteroids[i].y === 200) {
        asteroids.push({
          x: 100,
          y: -600,
        });
      }
    }

    context.drawImage(asteroid, 0, canvas.current.width, 20, 20);
    if (activeKeys.current.has('up')) {
      context.drawImage(spaceship, 500, 600, 60, 60);
    }

    function translateAndRotate(
      xPosition: number,
      yPosition: number,
      width: number,
      height: number,
      degrees: number,
      context: CanvasRenderingContext2D,
    ) {
      context.translate(xPosition + width / 2, yPosition + height / 2);
      context.rotate(inRad(degrees));
      context.translate(-(xPosition + width / 2), -(yPosition + height / 2));
    }

    //если нажата клавиша, то  сохр.холст, переместить корабль. восст.холст
    if (activeKeys.current.has('KeyA')) {
      context.save();
      translateAndRotate(500, 600, 60, 60, -90, context);

      // context.translate(530, 630);
      // context.rotate(-(Math.PI / 180) * 15);
      // context.translate(-530, -630);
      context.drawImage(spaceship, 500, 600, 60, 60);
      context.restore();
    } else if (activeKeys.current.has('KeyD')) {
      context.save();
      context.translate(530, 630);
      context.rotate((Math.PI / 180) * 90);
      context.translate(-530, -630);
      context.drawImage(spaceship, 500, 600, 60, 60);
      context.restore();
    }

    // context.save();
    // context.translate(canvas.current.width/2,canvas.current.height/2);
    // context.rotate(inRad(translateX));
    // context.drawImage(spaceship, translateX, 600, -60/2, -50/2);
    // context.restore();
    // context.resetTransform();

    // context.resetTransform();
    // context.clearRect(500, 600, 60, 50);
    refRequest.current = requestAnimationFrame(() => animate(context, context2));
    setTimestamp(Date.now());
    if (timestamp !== 0) {
      setDelta(Date.now() - timestamp);
    }
  };
  window.addEventListener('keydown', function (event) {
    eventHandler(event, false);
  });
  useEffect(() => {
    activeKeys.current.add('up');
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    const context2: CanvasRenderingContext2D | null = canvas2.current.getContext('2d');
    canvas.current.focus();
    if (!context || !context2 || !canvas.current || !canvas2.current) {
      return;
    }
    refRequest.current = requestAnimationFrame(() => animate(context, context2));
    return () => {
      cancelAnimationFrame(refRequest.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvas}
        tabIndex={0}
        width={window.innerWidth}
        height={window.innerHeight}
        className={classes.canvas}
      ></canvas>
      <canvas
        ref={canvas2}
        width={window.innerWidth}
        height={window.innerHeight}
        className={classes.canvas2}
      ></canvas>
    </>
  );
};

export default Canvas;