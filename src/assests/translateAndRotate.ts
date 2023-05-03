function inRad(num: number) {
  return (num * Math.PI) / 180;
}

/**
 * Функция отвечает за расчет координат точки на окружности, полученных
 * при вращении на определенное число градусов отрезка,
 * проведенного от центра окружности к ее дуге.
 * Принимает в качетве параметров координаты оси вращения, угол вращения, радиус окружности.
 * Возвращает координаты точки на окружности, на которую опирается отрезок после вращения.
 */
function rotateOverTheCenter(x: number, y: number, angle: number, radius: number) {
  // x=x0+r⋅cos δ
  let newX = x + radius * Math.cos(inRad(angle));

  // y=y0+r⋅sin δ
  let newY = y + radius * Math.sin(inRad(angle));

  return {x: newX, y: newY};
}
export const translateAndRotateRight = (
  xPosition: number,
  yPosition: number,
  width: number,
  height: number,
  degrees: number,
  context: CanvasRenderingContext2D,
) => {


  let vals = sinAndCos(degrees);

  /**
   * Нарисуем прямоугольник, правый верхний угол которого будет представлять собой ось вращения.
   * Это нужно для того, чтобы вычислить ось обратного вращения.
   * Осью обратного вращения будет левый верхний угол нарисованного прямоугольника.
   * Представим себе описанный прямоугольник:
   *
   * [] [] [К] [] []
   *
   * Буквой К указана постоянная позиция нашего корабля.
   * Зная это, а также, что каждая ячейка имеет ширину равную ширине изображения корабля,
   * мы можем отрисовать интересующий нас прямоугольник.
   */
  context.strokeStyle = "green";
  context.strokeRect(
    xPosition - width * 2, //Для отрисовки указывается координата левого верхнего угла необходимой фигуры
    yPosition + height, //Для отрисовки указывается координата левого верхнего угла необходимой фигуры
    width * 5, height);

  /**
   * Учитывая, что для отрисовки указываются координаты верхнего левого угла, а нас интересует верхний правый,
   * то понадобятся дополнительные вычисления.
   */


  //Круг с центром в оси вращения
  context.beginPath();
  context.arc(xPosition + width * 3, yPosition + height,width * 3,0,Math.PI*2,true);
  context.strokeStyle = "red";
  context.stroke();

  context.translate(xPosition + width * 3, yPosition + height);
  context.rotate(inRad(degrees));
  context.translate(-(xPosition + width * 3), -(yPosition + height));

  //синий прямоугольник, чтобы продемонстрировать вращение
  context.strokeStyle = "blue";
  context.strokeRect(xPosition - width * 2, yPosition + height, width * 5, height);
  context.strokeStyle = "white";
  context.strokeRect(xPosition, yPosition + height, width * 3, height);
  //Круг с центром в оси обратного вращения
  context.beginPath();
  context.arc(xPosition - width * 2, yPosition + height,width * 3,0,Math.PI*2,true);
  context.strokeStyle = "red";
  context.stroke();

}

export const translateAndRotateLeft = (
  xPosition: number,
  yPosition: number,
  width: number,
  height: number,
  degrees: number,
  context: CanvasRenderingContext2D,
) => {
  let vals = sinAndCos(degrees);

  /**
   * Нарисуем прямоугольник, левый верхний угол которого будет представлять собой ось вращения.
   */
  context.strokeStyle = "green";
  context.strokeRect(
    xPosition - width * 2, //Для отрисовки указывается координата левого верхнего угла необходимой фигуры
    yPosition + height, //Для отрисовки указывается координата левого верхнего угла необходимой фигуры
    width * 5, height);


  //Круг с центром в оси вращения
  context.beginPath();
  context.arc(xPosition - width * 2, yPosition + height,width * 3,0,Math.PI*2,true);
  context.strokeStyle = "white";
  context.stroke();

  context.translate(xPosition - width * 2, yPosition + height);
  context.rotate(inRad(degrees));
  context.translate(-(xPosition - width * 2), -(yPosition + height));

  //синий прямоугольник, чтобы продемонстрировать вращение
  context.strokeStyle = "blue";
  context.strokeRect(xPosition - width * 2, yPosition + height, width * 5, height);
  context.strokeStyle = "white";
  context.strokeRect(xPosition, yPosition + height, width * 3, height);
  //Круг с центром в оси обратного вращения
  context.beginPath();
  context.arc(xPosition - width * 2, yPosition + height,width * 3,0,Math.PI*2,true);
  context.strokeStyle = "red";
  context.stroke();
}

export function sinAndCos(angleInDegrees: number) {
  let angleInRadians = angleInDegrees * Math.PI / 180;
  let sin = Math.sin(angleInRadians);
  let cos = Math.cos(angleInRadians);
  console.log("s = " + sin + " c = " + cos);
  return {sin: sin, cos: cos};
}

function getReverseRotationCenter (
    xPosition: number,
    yPosition: number,
    width: number, //Ширина фигуры
    cos: number,
    sin: number,
  ) {
  let x = xPosition * sin + yPosition * cos;
  let y = yPosition * sin - xPosition * cos;
}