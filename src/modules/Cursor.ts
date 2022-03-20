import { loadImage } from './utilities/Functions';
import { CURSOR_TILE_SIZE } from './GameConstants';
import { context, scale } from './Canvas';

export const CursorStyle = {
  pointer: { x: 0 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
  pointed: { x: 1 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
  grabber: { x: 2 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
  grabbed: { x: 3 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
  gold_pointer: { x: 0 * CURSOR_TILE_SIZE, y: 1 * CURSOR_TILE_SIZE },
  gold_pointed: { x: 1 * CURSOR_TILE_SIZE, y: 1 * CURSOR_TILE_SIZE },
  gold_grabber: { x: 2 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
  gold_grabbed: { x: 3 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE },
};

export default class Cursor {
  // Our cursor sprite sheet
  image = null;
  style = CursorStyle.pointer;
  // Cursor positioning
  x = 0;
  y = 0;
  clickX = -1;
  clickY = -1;
  // Cursor types

  async load() {
    this.image = await loadImage('./assets/images/ui/cursor.png');

    document.addEventListener('mousedown', () => {
      this.style = CursorStyle.pointed;
      this.clickX = this.x;
      this.clickY = this.y;
    });
    document.addEventListener('mousemove', (event) => {
      // Update our cursors position
      this.x = Math.floor(event.pageX / scale);
      this.y = Math.floor(event.pageY / scale);
    });
    document.addEventListener('mouseup', () => {
      this.style = CursorStyle.pointer;
      this.clickX = -1;
      this.clickY = -1;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(delta: number) {
    // Draw the cursor on the screen
    context.drawImage(this.image, this.style.x, this.style.y, CURSOR_TILE_SIZE, CURSOR_TILE_SIZE, this.x - 10, this.y - 22, CURSOR_TILE_SIZE, CURSOR_TILE_SIZE);
  }

  // Returns if the cursor is over an object
  inBounds(minX, minY, width, height):boolean {
    const maxX = minX + width;
    const maxY = minY + height;
    return this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY;
  }

  // Returns if the last click was over an object
  clickInBounds(minX, minY, width, height):boolean {
    const maxX = minX + width;
    const maxY = minY + height;
    return this.clickX >= minX && this.clickX <= maxX && this.clickY >= minY && this.clickY <= maxY;
  }
}
