export const sinAndCos = (angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const sin = Math.sin(angleInRadians);
  const cos = Math.cos(angleInRadians);
  return { sin: sin, cos: cos };
};
