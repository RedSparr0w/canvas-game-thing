import PF from 'pathfinding';
import { loadImage } from '../utilities/Functions';
import { Settings } from '../utilities/Settings';
import Rand from '../utilities/Rand';
import { canvas, context } from '../Canvas';
import { PathFinders } from '../Maps';
import { MAP_TILE_SIZE, POKEMON_TILE_SIZE } from '../GameConstants';
import { PokemonNameType } from './PokemonNameType';
import { PokemonListData, pokemonMap } from './PokemonList';
import type Player from '../player/Player';
import CanvasTinyNumber from '../ui/CanvasTinyNumber';
import { PokemonLevelRequirements } from './PokemonEnums';

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
  team: Player;
  image: HTMLImageElement;
  pokemon: PokemonListData;
  enemy: Pokemon;
  shiny: boolean;
  // Movement
  speed = 1500;
  collisions: Array<Array<number>>;
  collisionMap: any;
  currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  paths: Array<number[]> = [];
  startMovementFrame = 0;
  startAttackFrame = 0;
  // TODO: Stats
  stats: Record<string, number> = {};
  maxStats: Record<string, number> = {};
  xp: number = 0;
  nextLevel: number;

  private frame = 0;
  private action = PokemonAction.moving;

  constructor(
    name: PokemonNameType,
    spawn: { x: number, y: number },
    public direction = PokemonDirection.right,
    // TODO: calculate based on enemy position/spawn
    public destination: { x: number, y: number },
    public level = 1
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
    this.shiny = Rand.chance(20);
    this.loadImage();
    this.calcStats();
    this.nextLevel = PokemonLevelRequirements[this.pokemon.levelType][this.level] - PokemonLevelRequirements[this.pokemon.levelType][this.level - 1];
  }

  async loadImage() {
    this.image = await loadImage(`./assets/images/pokemon/${`${this.pokemon.id}`.padStart(3, '0')}${this.shiny ? 's' : ''}.png`);
  }

  posToCanvas(x_?: number, y_?: number) {
    const x = x_ ?? this.currentPosition.x;
    const y = y_ ?? this.currentPosition.y;
    return {
      x: Math.floor((x + 0.5) * MAP_TILE_SIZE) - (POKEMON_TILE_SIZE * 0.5) - Settings.camera.x,
      y: Math.floor((y - 0.4) * MAP_TILE_SIZE) - Settings.camera.y,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getEnemy() {
    let enemy = null;
    let distance = Infinity;
    let destX;
    let destY;
    MyApp.game.teams.forEach((team) => {
      if (team === this.team) return;
      team.pokemon.forEach((e) => {
        const [x, y] = e.paths[0] ?? [e.currentPosition.x, e.currentPosition.y];
        const distX = Math.abs(this.currentPosition.x - x);
        const distY = Math.abs(this.currentPosition.y - y);
        const dist = distX + distY;
        if (dist < distance) {
          enemy = e;
          distance = dist;
          destX = x;
          destY = y;
        }
      });
    });

    this.destination.x = destX;
    this.destination.y = destY;
    this.enemy = enemy;
  }

  updateCollisionMap() {
    this.collisions = [...MyApp.game.map.current.collisions.map((a) => [...a])];
    // Only find collisions within this distance from ourselves
    const maxDist = 2;
    MyApp.game.teams.forEach((team) => {
      team.pokemon.forEach((p) => {
        // Don't include ourselves
        if (p === this) return;
        // Don't include the enemy (as it won't let us find a path to the tile)
        if (p === this.enemy) return;
        const x = (p.paths[0]?.[0] || p.currentPosition.x);
        const y = (p.paths[0]?.[1] || p.currentPosition.y);
        if (x === this.currentPosition.x && y === this.currentPosition.y) return;
        if (x >= this.currentPosition.x - maxDist && x <= this.currentPosition.x + maxDist && y >= this.currentPosition.y - maxDist && y <= this.currentPosition.y + maxDist) {
          this.collisions[y][x] = 1;
        }
      });
    });
    this.collisionMap = new PF.Grid(this.collisions);
  }

  getRandomDest() {
    this.destination.x = this.currentPosition.x + Rand.intBetween(-1, 1);
    this.destination.y = this.currentPosition.y + Rand.intBetween(-1, 1);
  }

  moveToNewPosition() {
    this.getEnemy();
    if (!this.enemy) this.getRandomDest();

    const { x, y } = this.currentPosition;
    const destX = this.destination.x;
    const destY = this.destination.y;

    // If we have an enemy, calculate our distance and if we should attack
    if (this.enemy) {
      const distX = Math.abs(x - destX);
      const distY = Math.abs(y - destY);
      // If next to an enemy, face them, and do nothing else
      if (distX + distY <= 1) {
        if (y - destY === 1) this.direction = PokemonDirection.up;
        else if (y - destY === -1) this.direction = PokemonDirection.down;
        else if (x - destX === 1) this.direction = PokemonDirection.left;
        else if (x - destX === -1) this.direction = PokemonDirection.right;
        this.action = PokemonAction.attacking;
        return;
      }
    }

    // Move towards the enemy/target
    this.updateCollisionMap();
    const paths = Rand.fromArray(PathFinders).findPath(x, y, destX, destY, this.collisionMap.clone());
    this.paths.push(...paths.splice(1, 1));

    // If we aren't moving at all, set path to current pos, so it doesn't spam trying to move
    if (!this.paths.length) this.paths.push([x, y]);

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

    if (this.action === PokemonAction.attacking) {
      const timePassed = this.frame - this.startAttackFrame;
      if (timePassed >= this.speed) {
        this.startAttackFrame = this.frame;
        // If enemy already dead
        if (!this.enemy?.stats?.hitpoints) {
          this.action = PokemonAction.idle;
          this.enemy = null;
        } else {
          // Attack
          // TODO: Calculate damage (move, typing, level etc)
          if (this.enemy.stats.hitpoints > 0) this.enemy.stats.hitpoints -= this.calcDamage(this.enemy);
          // If enemy dies from your hit
          if (this.enemy.stats.hitpoints <= 0) {
            // TODO: Fixup xp gain, enemy death (fade into ground?), compute all this stuff on the enemy, rather than here?
            this.enemy.team.pokemon.delete(this.enemy);
            this.gainExp(this.enemy);
            this.team.updateMoney(10);
            this.action = PokemonAction.idle;
            this.enemy = null;
          }
        }
      }
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
    const column = Math.floor(this.frame / Math.max(150, this.speed / 4)) % 4;
    context.drawImage(this.image, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);
    if (this.shiny) {
      context.drawImage(MyApp.images.list.sparkle, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);
    }

    const barX = x + (POKEMON_TILE_SIZE / 2) - 23;
    const barY = y + POKEMON_TILE_SIZE;
    context.drawImage(MyApp.images.list.pokemon_bar, barX, barY);
    const barsX = barX + 16;
    const barsSize = 28;
    // Hit points
    context.fillStyle = 'tomato';
    context.fillRect(barsX, barY + 1, (this.stats.hitpoints / this.maxStats.hitpoints) * barsSize, 2);
    // Experience
    if (this.level < 99) {
      context.fillStyle = 'deepskyblue';
      context.fillRect(barsX, barY + 4, Math.min(barsSize, (this.xp / this.nextLevel) * barsSize), 2);
    } else {
      context.fillStyle = '#555';
      context.fillRect(barsX, barY + 4, barsSize, 2);
    }
    CanvasTinyNumber.draw(this.level.toString().padStart(2, '0'), barX + 8, barY + 1);
  }

  calcDamage(enemy: Pokemon): number {
    // TODO:
    // Factor in enemy type
    // Move power?
    // STAB?
    // Critical chance?
    // Use move types (physical/special)
    const power = 10;
    // let damage = (2 * this.level);
    let damage = (2 * this.level);
    damage *= power;
    damage *= Math.max(this.stats.attack, this.stats.specialAttack) / Math.max(enemy.stats.defense, enemy.stats.specialDefense);
    damage /= 50;
    damage += 2;
    return Math.max(1, Math.round(damage));
  }

  calcStats(): void {
    Object.keys(this.pokemon.base).forEach((stat) => {
      let newMax = 2 * this.pokemon.base[stat] * this.level;
      newMax /= 100;
      newMax += (stat === 'hitpoints' ? this.level + 10 : 5);
      newMax = Math.round(newMax);
      if (stat !== 'hitpoints' || this.stats[stat] === undefined) {
        this.stats[stat] = newMax;
        this.maxStats[stat] = newMax;
      } else {
        // Calculte the difference of old max vs new max
        const healAmount = (newMax - this.maxStats[stat]);
        this.maxStats[stat] = newMax;
        this.heal(healAmount);
      }
    });
    this.speed = 1100 - (this.pokemon.base.speed * 5);
  }

  heal(amount: number): void {
    this.stats.hitpoints = Math.min(this.maxStats.hitpoints, this.stats.hitpoints + amount);
  }

  damage(amount: number): void {
    this.stats.hitpoints = Math.max(0, this.stats.hitpoints - amount);
  }

  gainExp(enemy: Pokemon) {
    let xp = enemy.pokemon.exp;
    xp *= enemy.level;
    xp *= enemy.team ? 1.5 : 1;
    xp /= 7;
    xp = Math.max(1, Math.round(xp));
    this.xp += xp;

    // TODO: calculate levels etc
    let evolve = false;
    while (this.xp >= this.nextLevel && this.level < 99) {
      this.xp -= this.nextLevel;
      // Increase attack?
      this.nextLevel = this.pokemon.exp + ((this.pokemon.exp * this.level) * 0.5);
      // Update new level
      this.level += 1;

      // Evolve if we can
      if (this.level === 3 && this.pokemon.evolution) {
        this.pokemon = pokemonMap[this.pokemon.evolution];
        evolve = true;
      }

      if (this.level === 6 && this.pokemon.evolution) {
        this.pokemon = pokemonMap[this.pokemon.evolution];
        evolve = true;
      }

      // Calculate xp needed for next level up
      this.nextLevel = PokemonLevelRequirements[this.pokemon.levelType][this.level] - PokemonLevelRequirements[this.pokemon.levelType][this.level - 1];

      // Re calculate stats
      this.calcStats();
    }
    // If we evolved, load our new image
    if (evolve) this.loadImage();
  }
}
