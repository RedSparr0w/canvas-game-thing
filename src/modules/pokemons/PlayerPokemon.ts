import Pokemon, { PokemonDirection } from './Pokemon';

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
}
