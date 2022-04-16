import PlayerPokemon from './PlayerPokemon';
import { PokemonDirection } from './Pokemon';

export default class EnemyPokemon extends PlayerPokemon {
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

  getEnemy() {
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
    }
  }
}
