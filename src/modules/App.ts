import { canvas, context } from './Canvas';
import Cursor from './Cursor';
import Game from './Game';
import Menu from './Menu';
import { fpsGraph, Settings } from './utilities/Settings';

export default class App {
  public static game: Game = new Game();
  public static menu: Menu = new Menu();
  public static cursor: Cursor = new Cursor();
  // our standarad variables
  public static frame = 0;

  public static async load() {
    await App.cursor.load();
    await App.menu.load();
    await App.game.load();
    // Start drawing to canvas
    requestAnimationFrame(App.draw);
  }

  public static draw(time) {
    const delta = time - App.frame;
    // Limit our fps, skip frames where needed
    if (delta < Settings.mspf) {
      requestAnimationFrame(App.draw);
      return;
    }
    fpsGraph.begin();

    // Set our background color
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw to our canvas using whatever our current draw function is
    App.drawFunction(delta);

    // Draw our cursor last so it is on top of everything
    App.cursor.draw(delta);

    // Update last frame time
    App.frame = time;
    fpsGraph.end();
    // start next frame
    requestAnimationFrame(App.draw);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static drawFunction = (delta: number) => App.game.draw(delta);
}
