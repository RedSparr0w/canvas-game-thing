import type Player from '../player/Player';
import Pokemon, { PokemonDirection } from './Pokemon';
import { PokemonNameType } from './PokemonNameType';

export default class EnemyPokemon extends Pokemon {
  direction = PokemonDirection.left;
  currentPosition = {
    x: MyApp.game.map.current.enemy.spawn.x + 1,
    y: MyApp.game.map.current.enemy.spawn.y,
  };
  paths = [[MyApp.game.map.current.enemy.spawn.x, MyApp.game.map.current.enemy.spawn.y]];
  destination = {
    x: MyApp.game.map.current.player.spawn.x,
    y: MyApp.game.map.current.player.spawn.y,
  };

  constructor(
    public parent: Player,
    name: PokemonNameType,
    spawn: { x: number, y: number },
    direction = PokemonDirection.right,
    // TODO: calculate based on enemy position/spawn
    destination: { x: number, y: number }
  ) {
    super(name, spawn, direction, destination);
  }

  getEnemy() {
    super.getEnemy();
    let enemy = null;
    let distance = Infinity;
    let destX;
    let destY;
    MyApp.game.player.pokemon.forEach((e) => {
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
    if (enemy) {
      this.destination.x = destX;
      this.destination.y = destY;
      this.enemy = enemy;
    } else {
      // TODO: remove once boss/base pokemon added as once that is defeated, the game should end
      this.destination.x = MyApp.game.map.current.player.spawn.x;
      this.destination.y = MyApp.game.map.current.player.spawn.y;
    }
  }
}
