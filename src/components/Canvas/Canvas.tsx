import {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import classes from './Canvas.module.css';
import { translateAndRotateLeft, translateAndRotateRight } from '../../assests/translateAndRotate';
import { space, spaceship, asteroid } from '../../assests/gameObjects';
import { sinAndCos } from '../../assests/translateAndRotate';

const Canvas: FC = ({ ...props }) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const refRequest = useRef(null);
  const [timestamp, setTimestamp] = useState(0);
  const [delta, setDelta] = useState(1);
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
  let spaceships: any = {
    xPos: 500,
    yPos: 600,
  };

  let rotationCoordinates = {
    xPosRight: 500 + 3 * 60,
    yPosRight: 600 + 60,
    xPosLeft: 500 - 2 * 60,
    yPosLeft: 600 + 60,
  }
  let keyPressed: any = {
    keyCode: ""
  };
  let currentDegrees = 0;
  const activeKeys = useRef(keyPressed);

// TODO надо создать две группы координат, содержащие изначальные координаты осей вращения.
// TODO При нажатии на любую из клавиш вращения, координаты оси обратного вращения должны изменяться с учетом радиуса вращения.
  function eventHandler(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'KeyA') {
      currentDegrees -= 5;
      let args = sinAndCos(currentDegrees);
      rotationCoordinates.xPosRight = rotationCoordinates.xPosLeft - 300 * args.cos;
      rotationCoordinates.yPosRight = rotationCoordinates.yPosLeft - 300 * args.cos;

      activeKeys.current.keyCode = event.code;

    } else if (event.code === 'KeyD') {
      currentDegrees += 5;
      let args = sinAndCos(currentDegrees);
      rotationCoordinates.xPosLeft = rotationCoordinates.xPosRight - 300 * args.cos;
      rotationCoordinates.yPosLeft = rotationCoordinates.yPosRight - 300 * args.cos;

      activeKeys.current.keyCode = event.code;
    }
  }

  function dropDegreesWhenCircleReached(degrees: number) {
    if (degrees === 360 || degrees === -360) {
      return 0;
    } else return  degrees;
  }

  function fly(ctx: CanvasRenderingContext2D,
               spaceshipImage: HTMLImageElement,
               xPosition: number,
               yPosition: number,
               width: number,
               height: number,
               activeKeys:  MutableRefObject<any>,
               speed: number,
               degrees: number) {
    const angle = dropDegreesWhenCircleReached(degrees);
    const trigonometricFunctions = sinAndCos(angle);
    // spaceships.xPos += speed * trigonometricFunctions.sin;
    // spaceships.yPos -= speed * trigonometricFunctions.cos;
    ctx.save();
    if (activeKeys.current.keyCode === 'KeyA') {
      translateAndRotateRight(xPosition, yPosition, width, height, angle, ctx);
    } else if (activeKeys.current.keyCode === 'KeyD') {
      translateAndRotateRight(xPosition, yPosition, width, height, angle, ctx);
    }
    ctx.drawImage(spaceshipImage, xPosition, yPosition, width, height);
    ctx.restore();

  }

  const animate = (context: CanvasRenderingContext2D) => {
    context.drawImage(space, 0, 0, window.innerWidth, window.innerHeight);
    // for (let i = 0; i < background.length; i++) {
    //   context.drawImage(
    //     space,
    //     background[i].x,
    //     background[i].y,
    //     window.innerWidth,
    //     window.innerHeight,
    //   );
    //   background[i].y++;
    //   if (background[i].y === 0) {
    //     background.push({
    //       x: 0,
    //       y: -window.innerHeight,
    //     });
    //   }
    // }

    // for (let i = 0; i < asteroids.length; i++) {
    //   context.drawImage(asteroid, asteroids[i].x, asteroids[i].y);
    //   asteroids[i].y++;
    //   if (asteroids[i].y === 200) {
    //     asteroids.push({
    //       x: 100,
    //       y: -600,
    //     });
    //   }
    // }

    let degrees = 0;
    if (activeKeys.current.keyCode === "") {
      context.save();
      context.drawImage(spaceship, spaceships.xPos, spaceships.yPos, 60, 60);
      context.restore();

    } else fly(context, spaceship, spaceships.xPos, spaceships.yPos, 60, 60, activeKeys, 1, currentDegrees);

    refRequest.current = requestAnimationFrame(() => animate(context));
    setTimestamp(Date.now());
    if (timestamp !== 0) {
      setDelta(Date.now() - timestamp);
    }
  };
  window.addEventListener('keydown', function (event) {
    eventHandler(event);
  });
  useEffect(() => {
    // activeKeys.current.add('up');
    const context: CanvasRenderingContext2D | null = canvas.current.getContext('2d');
    canvas.current.focus();
    if (!context || !canvas.current) {
      return;
    }
    refRequest.current = requestAnimationFrame(() => animate(context));
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
    </>
  );
};

export default Canvas;