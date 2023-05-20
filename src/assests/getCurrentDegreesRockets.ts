export const getCurrentDegreesRockets = (
  spaceshipXpos: number,
  spaceshipYpos: number,
  rocketPosition: Record<string, number>,
) => {
  let vectorX;
  let vectorY;
  vectorX = spaceshipXpos - rocketPosition.x;
  vectorY = spaceshipYpos - rocketPosition.y;
  const motionVector = Math.sqrt(vectorX ** 2 + vectorY ** 2);
  const sin = vectorX / motionVector;
  if (rocketPosition.y > spaceshipYpos) {
    return -180 - -(Math.asin(sin) * 180) / Math.PI;
  } else {
    return -(Math.asin(sin) * 180) / Math.PI;
  }
};
