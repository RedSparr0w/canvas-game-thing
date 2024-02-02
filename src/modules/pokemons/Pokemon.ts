import PF from 'pathfinding';
import { canvas, context } from '../Canvas';
import { MAP_TILE_SIZE, POKEMON_TILE_SIZE } from '../GameConstants';
import { PathFinders } from '../Maps';
import { Attacks } from '../attack/Attacks';
import type Team from '../player/Team';
import CanvasTinyNumber from '../ui/CanvasTinyNumber';
import { loadImage } from '../utilities/Functions';
import Rand from '../utilities/Rand';
import { Settings } from '../utilities/Settings';
import {
  PokemonAction,
  PokemonDirection,
  PokemonLevelRequirements,
  SpawnPosition,
} from './PokemonEnums';
import { PokemonListData, pokemonMap } from './PokemonList';
import { PokemonNameType } from './PokemonNameType';

export default class Pokemon {
  image: HTMLImageElement;
  pokemon: PokemonListData;
  enemy: Pokemon;
  shiny: boolean;
  // Movement
  speed = 1500;
  collisions: Array<Array<number>>;
  collisionMap: any;
  currentPosition: { x: number, y: number } = { x: 0, y: 0 };
  destination: { x: number, y: number } = { x: 0, y: 0 };
  direction: PokemonDirection = PokemonDirection.right;
  paths: Array<number[]> = [];
  startMovementFrame = 0;
  startAttackFrame = 0;
  // Stats
  level = 1;
  stats: Record<string, number> = {};
  maxStats: Record<string, number> = {};
  xp: number = 0;
  nextLevel: number;

  private frame = 0;
  private action = PokemonAction.moving;

  constructor(
    public team: Team,
    name: PokemonNameType,
    public spawn: SpawnPosition
  ) {
    this.pokemon = pokemonMap[name];
    this.paths.push([spawn.x, spawn.y]);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;

    // eslint-disable-next-line default-case
    switch (spawn.direction) {
      case PokemonDirection.right:
        this.currentPosition.x -= 1;
        break;
      case PokemonDirection.left:
        this.currentPosition.x += 1;
        break;
      case PokemonDirection.down:
        this.currentPosition.y -= 1;
        break;
      case PokemonDirection.up:
        this.currentPosition.y += 1;
        break;
    }

    this.direction = spawn.direction;
    this.shiny = Rand.chance(20);
    this.loadImage();
    this.calcStats();
    this.nextLevel = PokemonLevelRequirements[this.pokemon.levelType][this.level] - PokemonLevelRequirements[this.pokemon.levelType][this.level - 1];
    this.setLevel(spawn.level || this.level);
  }

  async loadImage() {
    this.image = await loadImage(`./assets/images/pokemon/${`${this.pokemon.id}`.padStart(3, '0')}${this.shiny ? 's' : ''}.png`);
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

  // eslint-disable-next-line class-methods-use-this
  tileToCanvas(x: number, y: number): { x: number, y: number } {
    return {
      x: Math.floor((x + 0.5) * MAP_TILE_SIZE) - (POKEMON_TILE_SIZE * 0.5) - Settings.camera.x,
      y: Math.floor((y - 0.4) * MAP_TILE_SIZE) - Settings.camera.y,
    };
  }

  draw(delta) {
    if (!this.image) return;
    this.frame += delta;

    let { x, y } = this.tileToCanvas(this.currentPosition.x, this.currentPosition.y);

    // If we aren't doing anything, check what we should do
    if (this.action === PokemonAction.idle) {
      this.think();
    }

    if (this.action === PokemonAction.attacking) {
      this.handleAttack();
    }

    if (this.paths.length) {
      let { x: newX, y: newY} = this.movePokemon(x, y);
      x = newX;
      y = newY;
    }

    // Floor our values
    x = Math.floor(x);
    y = Math.floor(y);

    if (this.isOutOfFrame(x)) return;

    this.drawPokemon(x, y);
    this.drawShinyPokemon(x, y);
    this.drawPokemonBar(x, y);
  }

  handleAttack() {
    const timePassed = this.frame - this.startAttackFrame;
    if (timePassed >= this.speed) {
      this.startAttackFrame = this.frame;
      if (!this.enemy?.stats?.hitpoints) {
        // If our enemy is dead, we just stop attacking
        this.action = PokemonAction.idle;
        this.enemy = null;
      } else {
        // Type 1 attacks
        let attacks = [...Object.values(Attacks[this.pokemon.type[0]])];
        // If we have a secondary type, also use those attacks
        if (this.pokemon.type[1] >= 0) attacks = [...attacks, ...Object.values(Attacks[this.pokemon.type[1]])];
        // If none of our types have attacks yet, we just use Cut
        if (!attacks.length) attacks.push(Attacks[0].Cut);
        // Select a random attack from our available attacks to use
        Rand.fromArray(attacks).use({ ...this.destination, direction: this.direction });

        // Calculate damage
        if (this.enemy.stats.hitpoints > 0) this.enemy.stats.hitpoints -= this.calcDamage(this.enemy);
        // If the enemy is dead, remove them from the team
        if (this.enemy.stats.hitpoints <= 0) {
          this.enemy.team.pokemon.delete(this.enemy);
          this.defeatEnemy(this.enemy);
          this.team.updateMoney(10);
          this.action = PokemonAction.idle;
          this.enemy = null;
        }
      }
    }
  }

  movePokemon(x, y) {
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

    if (timePassed >= this.speed) {
      this.startMovementFrame = this.frame;
      this.currentPosition.x = newX;
      this.currentPosition.y = newY;
      this.paths.splice(0, 1);
      if (!this.paths.length) {
        this.action = PokemonAction.idle;
      }
    }

    return {x, y};
  }

  // TODO: Calculate Y out of frame too
  isOutOfFrame(x) {
    return x + POKEMON_TILE_SIZE <= 0 && x >= canvas.width;
  }

  drawPokemon(x, y) {
    const column = Math.floor(this.frame / Math.max(150, this.speed / 4)) % 4;
    context.drawImage(this.image, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);
  }

  drawShinyPokemon(x, y) {
    if (this.shiny) {
      const column = Math.floor(this.frame / Math.max(150, this.speed / 4)) % 4;
      context.drawImage(MyApp.images.list.sparkle, column * POKEMON_TILE_SIZE, this.direction * POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE, x, y, POKEMON_TILE_SIZE, POKEMON_TILE_SIZE);
    }
  }

  drawPokemonBar(x, y) {
    const barX = x + (POKEMON_TILE_SIZE / 2) - 23;
    const barY = y + POKEMON_TILE_SIZE;
    context.drawImage(MyApp.images.list.pokemon_bar, barX, barY);
    const barsX = barX + 16;
    const barsSize = 28;
    context.fillStyle = 'tomato';
    context.fillRect(barsX, barY + 1, (this.stats.hitpoints / this.maxStats.hitpoints) * barsSize, 2);
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
    // TODO: Figure out a better formula?
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
      // Buff shinies by 10%
      if (this.shiny) newMax *= 1.1;
      newMax = Math.round(newMax);
      if (stat !== 'hitpoints' || this.stats[stat] === undefined) {
        this.stats[stat] = newMax;
        this.maxStats[stat] = newMax;
      } else {
        // Calculate the difference of old max vs new max and heal the pokemon by the difference
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

  // TODO: Figure out why some pokemon don't evolve when summoned
  setLevel(level: number): void {
    const xp = PokemonLevelRequirements[this.pokemon.levelType][level - 1] - PokemonLevelRequirements[this.pokemon.levelType][this.level - 1];
    this.gainExp(xp);
  }

  defeatEnemy(enemy: Pokemon) {
    let xp = enemy.pokemon.exp;
    xp *= enemy.level;
    // Killing a shiny will give more xp
    xp *= enemy.shiny ? 1.5 : 1;
    xp /= 7;
    xp = Math.max(1, Math.round(xp));
    this.gainExp(xp);
  }

  gainExp(xp: number) {
    this.xp += xp;

    let evolve = false;
    // Max out at level 99
    while (this.xp >= this.nextLevel && this.level < 99) {
      // We want to reset our xp to 0, but keep the remainder
      this.xp -= this.nextLevel;

      // Update new level
      this.level += 1;

      // TODO: Figure out evolutions
      // Temp level 6 and 12
      // Evolve if we can
      if (this.level === 6 && this.pokemon.evolution) {
        this.pokemon = pokemonMap[this.pokemon.evolution];
        evolve = true;
      }

      if (this.level === 12 && this.pokemon.evolution) {
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
