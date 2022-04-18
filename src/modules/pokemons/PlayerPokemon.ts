import type Player from '../player/Player';
import Pokemon, { PokemonDirection } from './Pokemon';
import { PokemonNameType } from './PokemonNameType';

export default class PlayerPokemon extends Pokemon {
  direction = PokemonDirection.right;
  currentPosition = {
    x: MyApp.game.map.current.player.spawn.x - 1,
    y: MyApp.game.map.current.player.spawn.y,
  };
  paths = [[MyApp.game.map.current.player.spawn.x, MyApp.game.map.current.player.spawn.y]];
  destination = {
    x: MyApp.game.map.current.enemy.spawn.x,
    y: MyApp.game.map.current.enemy.spawn.y,
  };

  constructor(
    public team: Player,
    name: PokemonNameType,
    spawn: { x: number, y: number },
    direction = PokemonDirection.right,
    level = 1
  ) {
    super(name, spawn, direction, level);
  }
}
