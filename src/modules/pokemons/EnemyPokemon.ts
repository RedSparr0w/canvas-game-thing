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
    public team: Player,
    name: PokemonNameType,
    spawn: { x: number, y: number },
    direction = PokemonDirection.right,
    // TODO: calculate based on enemy position/spawn
    destination: { x: number, y: number },
    level = 1
  ) {
    super(name, spawn, direction, destination, level);
  }
}
