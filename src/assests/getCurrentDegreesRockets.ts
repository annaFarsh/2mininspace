export const getCurrentDegreesRockets = (
  spaceshipXpos: number,
  spaceshipYpos: number,
  rocketPosition: Record<string, number>,
) => {
  const vectorX = spaceshipXpos - rocketPosition.x;
  const vectorY = spaceshipYpos - rocketPosition.y;
  const motionVector = Math.sqrt((vectorX ** 2) + (vectorY ** 2));
  // const oppositeLeg = spaceshipXpos - rocketPosition.x;
  // const adjacentLeg = spaceshipYpos - rocketPosition.y;
  const sin = vectorX / motionVector;
  return -(Math.asin(sin) * 180) / Math.PI;
  // const tg = oppositeLeg / adjacentLeg;
  // return 2 * Math.PI - Math.tan(tg);
};
