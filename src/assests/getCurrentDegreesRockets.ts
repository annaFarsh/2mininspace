export const getCurrentDegreesRockets = (
  spaceshipXpos: number,
  spaceshipYpos: number,
  rocketPosition: Record<string, number>,
  goHunt: string,
) => {
  const vectorX = spaceshipXpos - rocketPosition.x;
  const vectorY = spaceshipYpos - rocketPosition.y;
  const motionVector = Math.sqrt(vectorX ** 2 + vectorY ** 2);
  const sin = vectorX / motionVector;
  if (rocketPosition.y > spaceshipYpos && goHunt === 'continue') {
    return -180 - (-Math.asin(sin) * 180) / Math.PI;
  }
  if(rocketPosition.y < spaceshipYpos && goHunt === 'continue'){
    return -(Math.asin(sin) * 180) / Math.PI;
  }
  if(goHunt === 'stop'){
    return 190;
  }
};

