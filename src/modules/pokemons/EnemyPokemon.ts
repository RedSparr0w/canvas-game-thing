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
}
