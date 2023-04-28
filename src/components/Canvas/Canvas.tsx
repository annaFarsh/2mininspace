import { useRef } from 'react';
import classes from './Canvas.module.css';
const Canvas = () => {
  // const minX = window.innerWidth / -2;
  // const minY = 100 - window.innerHeight;
  // const width = window.innerWidth;
  // const height = window.innerHeight;
  const canvasRef = useRef(null);
  return (
    <canvas ref={canvasRef} width={300} height={300} className={classes.canvas}></canvas>
  );
};

export default Canvas;