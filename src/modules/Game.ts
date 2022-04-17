import { canvas, context } from './Canvas';
import GameMap from './Maps';
import Player from './player/Player';
import Enemy from './player/Enemy';
import { drawFrame } from './utilities/CanvasFunctions';
import { Settings } from './utilities/Settings';

export default class Game {
  public running = false;

  constructor(
    public map = new GameMap(),
    public player = new Player(),
    public enemy = new Enemy()
  ) {}

  // TODO: map types?
  async load() {
    await this.map.load();
    await this.player.load();
    await this.enemy.load();
  }

  async start(map: string) {
    // Load our map
    await this.map.setMap(map);
    // Setup the players
    this.player.setup(this.map.current);
    this.enemy.setup(this.map.current);
    this.running = true;
  }

  async stop() {
    this.running = false;
  }

  draw(delta: number) {
    // If our game isn't started/runnign return
    if (!this.running) return;

    // Draw our map
    context.drawImage(MyApp.game.map.current.image, -Settings.camera.x, -Settings.camera.y);
    // Process our player/enemy
    this.player.draw(delta);
    this.enemy.draw(delta);
    // overlayed images (should appear above stuff on the map)
    context.drawImage(MyApp.game.map.current.image_top, -Settings.camera.x, -Settings.camera.y);

    /*
    Draw our game menu stuff
    */
    drawFrame(0, 480, canvas.width, 120);
  }
}
