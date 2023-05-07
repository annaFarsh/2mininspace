import { inRad } from './inRad';

export const rotateOverTheCenter = (x: number, y: number, angle: number, radius: number) => {
  const newX = x + radius * Math.cos(inRad(angle));
  const newY = y + radius * Math.sin(inRad(angle));
  return { x: newX, y: newY };
};
