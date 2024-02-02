import { MAP_TILE_SIZE } from './GameConstants';

export const canvas = document.querySelector('canvas');

canvas.height = 10 * MAP_TILE_SIZE;
// eslint-disable-next-line import/no-mutable-exports
export let scale = (window.innerHeight * 0.8) / canvas.height;
canvas.width = Math.floor(window.innerWidth / scale);

export const context = canvas.getContext('2d');

// Create temp canvas and context
const tempCanvas = document.createElement('canvas');
const tempContext = tempCanvas.getContext('2d');
// On window resize
window.addEventListener('resize', () => {
  // Adjust temp canvas size
  tempCanvas.height = canvas.height;
  tempCanvas.width = canvas.width;

  // Draw current canvas to temp canvas
  tempContext.drawImage(canvas, 0, 0);

  // Resize current canvas
  scale = window.innerHeight / canvas.height;
  canvas.width = Math.floor(window.innerWidth / scale);

  // Draw temp canvas back to the current canvas
  context.drawImage(tempContext.canvas, 0, 0);
});

export const cameraZoom = (distance: number) => {
  canvas.height = 10 * MAP_TILE_SIZE * distance;
  // eslint-disable-next-line import/no-mutable-exports
  scale = (window.innerHeight * 0.8) / canvas.height;
  canvas.width = Math.floor(window.innerWidth / scale);
};
