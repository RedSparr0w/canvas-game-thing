/* eslint-disable import/no-cycle */
import { Attacks } from './attack/Attacks';
import Cursor from './Cursor';
import Game from './Game';
import Images from './Images';
import Menus from './menu/Menus';
import UI from './UI';
import { fpsGraph, Settings } from './utilities/Settings';

export default class App {
  // our standarad variables
  public frame = 0;

  constructor(
    public cursor = new Cursor(),
    public images = new Images(),
    public ui = new UI(),
    public menus = new Menus(),
    public game = new Game()
  ) {}

  public async load() {
    await this.cursor.load();
    await this.images.load();
    await this.ui.load();
    await this.menus.load();
    await this.game.load();
    Object.values(Attacks).forEach((type) => Object.values(type).forEach((attack) => attack.load()));
    // Start drawing our game
    requestAnimationFrame(this.draw.bind(this));
  }

  public draw(time: number) {
    let delta = time - this.frame;
    // Limit our fps, skip frames where needed
    if (delta < Settings.mspf) {
      requestAnimationFrame(this.draw.bind(this));
      return;
    }
    // Update last frame time
    this.frame = time;
    // If tab has been out of focus or major lag, don't try to compensate
    if (delta >= 500) {
      requestAnimationFrame(this.draw.bind(this));
      return;
    }
    fpsGraph.begin();

    delta *= Settings.speed;

    // Set our background color
    // context.fillStyle = '#333';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw to our canvas using whatever our current draw function is
    this.game.draw(delta);

    // Draw our cursor last so it is on top of everything
    this.cursor.draw(delta);

    fpsGraph.end();
    // start next frame
    requestAnimationFrame(this.draw.bind(this));
  }
}
