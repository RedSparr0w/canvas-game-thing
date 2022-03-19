/* eslint-disable import/no-cycle */
import { canvas, context } from './Canvas';
import Cursor from './Cursor';
import Game from './Game';
import Menu from './Menu';
import UI from './UI';
import { fpsGraph, Settings } from './utilities/Settings';

export default class App {
  // our standarad variables
  public static frame = 0;

  public static async load() {
    await Cursor.load();
    await UI.load();
    // await Menu.load();
    await Game.load();
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
    Cursor.draw(delta);

    // Update last frame time
    App.frame = time;
    fpsGraph.end();
    // start next frame
    requestAnimationFrame(App.draw);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static drawFunction = (delta: number) => Menu.draw(delta);
}
