export const getReverseRotationCenter = (
  xPosition: number,
  yPosition: number,
  width: number,
  cos: number,
  sin: number,
) => {
  const x = xPosition * sin + yPosition * cos;
  const y = yPosition * sin - xPosition * cos;
}