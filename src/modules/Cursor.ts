import { loadImage } from './utilities/Functions';
import { CURSOR_TILE_SIZE } from './GameConstants';

export default class Cursor {
  // Our cursor sprite sheet
  public static image = null;
  // Cursor positioning
  public static x = 0;
  public static y = 0;
  // Cursor types
  public static pointer = { x: 0 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };
  public static pointed = { x: 1 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };
  public static grabber = { x: 2 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };
  public static grabbed = { x: 3 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };
  public static gold_pointer = { x: 0 * CURSOR_TILE_SIZE, y: 1 * CURSOR_TILE_SIZE };
  public static gold_pointed = { x: 1 * CURSOR_TILE_SIZE, y: 1 * CURSOR_TILE_SIZE };
  public static gold_grabber = { x: 2 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };
  public static gold_grabbed = { x: 3 * CURSOR_TILE_SIZE, y: 0 * CURSOR_TILE_SIZE };

  public static async load() {
    this.image = await loadImage('./assets/images/ui/cursor.png');
  }
}

// Load our cursor image
Cursor.load();
