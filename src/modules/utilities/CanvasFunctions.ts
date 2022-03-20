import { context } from '../Canvas';

export const drawFrame = (x, y, width, height, color = '#1EA7E1', borderWidth = 2): void => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.fillStyle = '#222';
  context.fillRect(x + borderWidth, y + borderWidth, width - (borderWidth * 2), height - (borderWidth * 2));
};

export enum Alignment {
  top_left,
  top_right,
  bottom_left,
  bottom_right,
  center,
}

export const alignImage = (image: HTMLImageElement, posX: number, posY: number, position = Alignment.top_left) => {
  let x = posX;
  let y = posY;

  // eslint-disable-next-line default-case
  switch (position) {
    case Alignment.top_right:
      x -= image.width;
      break;
    case Alignment.bottom_left:
      y -= image.height;
      break;
    case Alignment.bottom_right:
      x -= image.width;
      y -= image.height;
      break;
    case Alignment.center:
      x -= image.width / 2;
      y -= image.height / 2;
      break;
  }

  // Round our x and y values
  x = Math.round(x);
  y = Math.round(y);
  return { x, y };
};
