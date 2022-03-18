import { Settings, Values, fpsGraph } from './utilities/Settings';
import { loadImage } from './utilities/Functions';

export class Cursor {
  // Our cursor sprite sheet
  public static image = null;
  // Cursor positioning
  public static x = 0;
  public static y = 0;
  // Cursor types
  public static pointer = { x: 0 * Settings.cursor_size, y: 0 * Settings.cursor_size };
  public static pointed = { x: 1 * Settings.cursor_size, y: 0 * Settings.cursor_size };
  public static grabber = { x: 2 * Settings.cursor_size, y: 0 * Settings.cursor_size };
  public static grabbed = { x: 3 * Settings.cursor_size, y: 0 * Settings.cursor_size };
  public static gold_pointer = { x: 0 * Settings.cursor_size, y: 1 * Settings.cursor_size };
  public static gold_pointed = { x: 1 * Settings.cursor_size, y: 1 * Settings.cursor_size };
  public static gold_grabber = { x: 2 * Settings.cursor_size, y: 0 * Settings.cursor_size };
  public static gold_grabbed = { x: 3 * Settings.cursor_size, y: 0 * Settings.cursor_size };

  public static async load() {
    this.image = await loadImage('./assets/images/ui/cursor.png');
  }
};

// Load our cursor image
Cursor.load();
