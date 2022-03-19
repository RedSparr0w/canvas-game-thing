import { context } from '../Canvas';

export const drawFrame = (x, y, width, height, color = '#1EA7E1'): void => {
  context.fillStyle = '#222';
  context.fillRect(x, y, width, height);
  context.fillStyle = color;
  context.fillRect(x + 2, y + 2, width - 4, height - 4);
  context.fillStyle = '#333';
  context.fillRect(x + 5, y + 5, width - 10, height - 10);
};

export const test = () => {};
