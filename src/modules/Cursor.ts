import { loadImage } from './utilities/Functions';
import { CURSOR_TILE_SIZE } from './GameConstants';
import { context } from './Canvas';

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
  static image = null;
  static style = CursorStyle.pointer;
  // Cursor positioning
  static x = 0;
  static y = 0;
  // Cursor types

  static async load() {
    this.image = await loadImage('./assets/images/ui/cursor.png');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static draw(delta: number) {
    // Draw the cursor on the screen
    context.drawImage(this.image, this.style.x, this.style.y, CURSOR_TILE_SIZE, CURSOR_TILE_SIZE, this.x - 10, this.y - 20, CURSOR_TILE_SIZE, CURSOR_TILE_SIZE);
  }

  // Returns if the cursor is over an object
  static inBounds(minX, minY, width, height):boolean {
    const maxX = minX + width;
    const maxY = minY + height;
    return this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY;
  }
}
