import { canvas, context } from './Canvas';
import GameMap from './Maps';
import Player from './player/Player';
import Enemy from './player/Enemy';
import { ButtonColor, ButtonStyle } from './ui/Button';
import { drawFrame } from './utilities/CanvasFunctions';
import { Settings } from './utilities/Settings';

export default class Game {
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
  }

  draw(delta) {
    /*
    Draw our game map
    */
    context.drawImage(MyApp.game.map.current.image, -Settings.camera, 0);
    // Process our player/enemy
    this.player.draw(delta);
    this.enemy.draw(delta);
    // overlayed images (should appear above stuff on the map)
    context.drawImage(MyApp.game.map.current.image_top, -Settings.camera, 0);

    /*
    Draw our game menu stuff
    */
    drawFrame(0, 480, canvas.width, 120);
    // Button
    // MyApp.ui.drawButton(6, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.blue });
    // MyApp.ui.drawButton(60, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.purple });
    // MyApp.ui.drawButton(114, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.pink });
    // MyApp.ui.drawButton(168, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.red });
    // MyApp.ui.drawButton(222, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.orange });
    // MyApp.ui.drawButton(276, canvas.height - 114, { style: ButtonStyle.outline, color: ButtonColor.green });
    // if (!inBounds(Cursor.x, Cursor.y, 84, canvas.height - images[2].height - 65, images[2].width, images[2].height)) {
    //   context.drawImage(images[2], 84, canvas.height - images[2].height - 65);
    // } else {
    //   context.drawImage(images[3], 84, canvas.height - images[3].height - 65);
    // }
  }
}
