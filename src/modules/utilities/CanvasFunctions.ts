import { context } from '../Canvas';

export const drawFrame = (x, y, width, height, color = '#1EA7E1', borderWidth = 2): void => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.fillStyle = '#222';
  context.fillRect(x + borderWidth, y + borderWidth, width - (borderWidth * 2), height - (borderWidth * 2));
};

export const test = () => {};
