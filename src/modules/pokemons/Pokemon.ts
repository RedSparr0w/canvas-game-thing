import { loadImage } from '../utilities/Functions';
import { Settings } from '../utilities/Settings';
import { canvas, context } from '../Canvas';
import { bestFirstFinder } from '../Maps';
import { MAP_TILE_SIZE, POKEMON_TILE_SIZE } from '../GameConstants';

export enum PokemonDirection {
  down = 0,
  left = 1,
  right = 2,
  up = 3,
}
export enum PokemonAction {
  idle = 0,
  moving = 1,
  attacking = 2,
  defending = 3,
}

export class Pokemon {
  public image: HTMLImageElement;
  // Movement
  public speed = 1500;
  public direction = PokemonDirection.right;
  public currentPosition = {
    x: Settings.map.player.spawn.x - 1,
    y: Settings.map.player.spawn.y,
  };
  public paths = [[Settings.map.player.spawn.x, Settings.map.player.spawn.y]];
  public startMovementFrame = 0;

  private frame = 0;
  private action = PokemonAction.moving;

  constructor(public name: string, public id: number) {
    this.loadImage();
    this.speed = 1500 - Math.floor(Math.random() * 1000);
  }

  async loadImage() {
    this.image = await loadImage(`./assets/images/pokemon/${`${this.id}`.padStart(3, '0')}.png`);
  }

  posToCanvas(x_?: number, y_?: number) {
    const x = x_ ?? this.currentPosition.x;
    const y = y_ ?? this.currentPosition.y;
    return {
      x: Math.floor((x + 0.5) * MAP_TILE_SIZE) - (POKEMON_TILE_SIZE * 0.5) - Settings.camera,
      y: Math.floor((y - 0.4) * MAP_TILE_SIZE),
    };
  }

  moveToNewPosition() {
    const { x } = this.currentPosition;
    const { y } = this.currentPosition;
    const destX = Settings.map.enemy.spawn.x;
    const destY = Settings.map.enemy.spawn.y;
    const distX = Math.abs(x - destX);
    const distY = Math.abs(y - destY);
    if (distX + distY <= 1) return;

    const paths = bestFirstFinder.findPath(x, y, destX, destY, Settings.map.collisions.clone());
    this.paths.push(...paths.splice(1, 5));

    // If we aren't moving at all, set status to idle
    if (!this.paths.length) return;

    this.action = PokemonAction.moving;
    this.startMovementFrame = this.frame;
  }

  think() {
    this.moveToNewPosition();
  }

  draw(delta) {
    if (!this.image) return;
    this.frame += delta;

    let { x, y } = this.posToCanvas(this.currentPosition.x, this.currentPosition.y);

    // If we aren't doing anything, check what we should do
    if (this.action === PokemonAction.idle) {
      this.think();
    }

    // Check if we need to move
    if (this.paths.length) {
      const timePassed = this.frame - this.startMovementFrame;
      const [newX, newY] = this.paths[0];
      if (this.currentPosition.x < newX) { // right
        x += Math.min(MAP_TILE_SIZE, (timePassed / this.speed) * MAP_TILE_SIZE);
        this.direction = PokemonDirection.right;
      } else if (this.currentPosition.x > newX) { // left
        x -= Math.min(MAP_TILE_SIZE, (timePassed / this.speed) * MAP_TILE_SIZE);
        this.direction = PokemonDirection.left;
      } else if (this.currentPosition.y < newY) { // down
        y += Math.min(MAP_TILE_SIZE, (timePassed / this.speed) * MAP_TILE_SIZE);
        this.direction = PokemonDirection.down;
      } else if (this.currentPosition.y > newY) { // up
        y -= Math.min(MAP_TILE_SIZE, (timePassed / this.speed) * MAP_TILE_SIZE);
        this.direction = PokemonDirection.up;
      }

      // Update our current position
      if (timePassed >= this.speed) {
        this.startMovementFrame = this.frame;
        this.currentPosition.x = newX;
        this.currentPosition.y = newY;
        this.paths.splice(0, 1);
        if (!this.paths.length) {
          this.action = PokemonAction.idle;
        }
      }
    }

    // Floor our values
    x = Math.floor(x);
    y = Math.floor(y);

    // If pokemon out of frame, we don't need to draw it
    if (x + POKEMON_TILE_SIZE <= 0 && x >= canvas.width) return;
    const column = this.action === PokemonAction.idle ? 0 : Math.floor(this.frame / 250) % 4;
    context.drawImage(this.image, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);
  }
}

export const PokemonList = [
  new Pokemon('Bulbasaur', 1),
  new Pokemon('Ivysaur', 2),
  new Pokemon('Venusaur', 3),
  new Pokemon('Charmander', 4),
  new Pokemon('Charmeleon', 5),
  new Pokemon('Charizard', 6),
  new Pokemon('Squirtle', 7),
  new Pokemon('Wartortle', 8),
  new Pokemon('Blastoise', 9),
  new Pokemon('Pidgey', 16),
  new Pokemon('Rattata', 19),
];
