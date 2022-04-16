import PF from 'pathfinding';
import { loadImage } from '../utilities/Functions';
import { Settings } from '../utilities/Settings';
import Rand from '../utilities/Rand';
import { canvas, context } from '../Canvas';
import { PathFinders } from '../Maps';
import { MAP_TILE_SIZE, POKEMON_TILE_SIZE } from '../GameConstants';
import { PokemonNameType } from './PokemonNameType';
import { PokemonListData, pokemonMap } from './PokemonList';

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

export default class Pokemon {
  image: HTMLImageElement;
  pokemon: PokemonListData;
  // Movement
  speed = 1500;
  currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  paths: Array<number[]> = [];
  startMovementFrame = 0;
  // TODO: Stats
  stats: any;
  collisions: Array<Array<number>>;
  collisionMap: any;

  private frame = 0;
  private action = PokemonAction.moving;

  constructor(
    name: PokemonNameType,
    spawn: { x: number, y: number },
    public direction = PokemonDirection.right,
    // TODO: calculate based on enemy position/spawn
    public destination: { x: number, y: number }
  ) {
    this.paths.push([spawn.x, spawn.y]);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;

    // eslint-disable-next-line default-case
    switch (this.direction) {
      case PokemonDirection.right:
        this.currentPosition.x -= 1;
        break;
      case PokemonDirection.left:
        this.currentPosition.x += 1;
        break;
    }

    this.pokemon = pokemonMap[name];
    this.loadImage();
    this.speed = 1500 - Math.floor(Math.random() * 1000);
  }

  async loadImage() {
    this.image = await loadImage(`./assets/images/pokemon/${`${this.pokemon.id}`.padStart(3, '0')}.png`);
  }

  posToCanvas(x_?: number, y_?: number) {
    const x = x_ ?? this.currentPosition.x;
    const y = y_ ?? this.currentPosition.y;
    return {
      x: Math.floor((x + 0.5) * MAP_TILE_SIZE) - (POKEMON_TILE_SIZE * 0.5) - Settings.camera,
      y: Math.floor((y - 0.4) * MAP_TILE_SIZE),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getEnemy() {}

  updateCollisionMap() {
    this.collisions = [...MyApp.game.map.current.collisions.map((a) => [...a])];
    const maxDist = 1;
    [
      ...MyApp.game.player.pokemon,
      ...MyApp.game.enemy.pokemon,
    ].forEach((p) => {
      const x = (p.paths[0]?.[0] || p.currentPosition.x);
      const y = (p.paths[0]?.[1] || p.currentPosition.y);
      if (x === this.currentPosition.x && y === this.currentPosition.y) return;
      if (x >= this.currentPosition.x - maxDist && x <= this.currentPosition.x + maxDist && y >= this.currentPosition.y - maxDist && y <= this.currentPosition.y + maxDist) {
        this.collisions[y][x] = 1;
      }
    });
    this.collisionMap = new PF.Grid(this.collisions);
  }

  moveToNewPosition() {
    this.getEnemy();
    const { x, y } = this.currentPosition;
    const destX = this.destination.x;
    const destY = this.destination.y;
    const distX = Math.abs(x - destX);
    const distY = Math.abs(y - destY);
    if (distX + distY <= 1) {
      if (y - destY === 1) this.direction = PokemonDirection.up;
      else if (y - destY === -1) this.direction = PokemonDirection.down;
      else if (x - destX === 1) this.direction = PokemonDirection.left;
      else if (x - destX === -1) this.direction = PokemonDirection.right;
      return;
    };
    this.updateCollisionMap();
    const paths = Rand.fromArray(PathFinders).findPath(x, y, destX, destY, this.collisionMap.clone());
    this.paths.push(...paths.splice(1, 1));

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
    const column = this.action === PokemonAction.idle ? Math.floor(this.frame / 250) % 4 : Math.floor(this.frame / 250) % 4;
    context.drawImage(this.image, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);

    const barX = x + (POKEMON_TILE_SIZE / 2) - 23;
    const barY = y + POKEMON_TILE_SIZE;
    context.fillStyle = '#222';
    context.fillRect(barX, barY, 45, 7);
    context.fillStyle = 'white';
    context.fillRect(barX + 16, barY + 1, 30, 1);
    context.fillStyle = 'tomato';
    context.fillRect(barX + 16, barY + 1, 24, 1);
    context.fillStyle = 'white';
    context.fillRect(barX + 16, barY + 3, 30, 1);
    context.fillStyle = 'deepskyblue';
    context.fillRect(barX + 16, barY + 3, 18, 1);
    context.fillStyle = 'white';
    context.fillRect(barX + 16, barY + 5, 30, 1);
    context.fillStyle = 'lime';
    context.fillRect(barX + 16, barY + 5, 20, 1);
  }
}
