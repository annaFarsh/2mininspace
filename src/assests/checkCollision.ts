export const checkCollision = (
  positionXObj1: number,
  positionYObj1: number,
  widthObj1: number,
  heightobj1: number,
  positionXObj2: number,
  positionYObj2: number,
  widthObj2: number,
  heightobj2: number,
) =>
  positionXObj1 <= positionXObj2 + widthObj2 - 20 &&
  positionXObj1 + widthObj1 >= positionXObj2 &&
  positionYObj1 <= positionYObj2 + heightobj2 - 20 &&
  positionYObj1 + heightobj1 >= positionYObj2;
