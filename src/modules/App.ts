/* eslint-disable import/no-cycle */
import { canvas, context } from './Canvas';
import Cursor from './Cursor';
import Game from './Game';
import Menu from './Menu';
import UI from './UI';
import { fpsGraph, Settings } from './utilities/Settings';

export default class App {
  // our standarad variables
  public frame = 0;

  constructor(
    public cursor = new Cursor(),
    public ui = new UI(),
    public menu = new Menu(),
    public game = new Game()
  ) {}

  public async load() {
    await this.cursor.load();
    await this.ui.load();
    await this.menu.load();
    await this.game.load('route1');
    // Start drawing to canvas
    requestAnimationFrame(this.draw.bind(this));
  }

  public draw(time: number) {
    const delta = time - this.frame;
    // Limit our fps, skip frames where needed
    if (delta < Settings.mspf) {
      requestAnimationFrame(this.draw.bind(this));
      return;
    }
    fpsGraph.begin();

    // Set our background color
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw to our canvas using whatever our current draw function is
    this.drawFunction(delta);

    // Draw our cursor last so it is on top of everything
    this.cursor.draw(delta);

    // Update last frame time
    this.frame = time;
    fpsGraph.end();
    // start next frame
    requestAnimationFrame(this.draw.bind(this));
  }

  private drawFunction = (delta: number) => this.game.draw(delta);
}
