import PlayerPokemon from '../../pokemons/PlayerPokemon';
import { PokemonDirection } from '../../pokemons/Pokemon';
import { PokemonNameType } from '../../pokemons/PokemonNameType';
import Menu from '../Menu';

const gameControls = new Menu('gameControls');
[...document.querySelectorAll('#gameControls [data-spawn]')].forEach((element: HTMLAnchorElement) => {
  element.innerText = element.dataset.spawn;
  element.dataset.button = element.dataset.spawn;
  gameControls.addButton(element.dataset.spawn, {
    click: () => {
      if (MyApp.game.player.pokemon.length >= 50) return;
      MyApp.game.player.pokemon.push(new PlayerPokemon(
        element.dataset.spawn as PokemonNameType,
        { x: MyApp.game.map.current.player.spawn.x, y: MyApp.game.map.current.player.spawn.y },
        PokemonDirection.right,
        { x: MyApp.game.map.current.enemy.spawn.x, y: MyApp.game.map.current.enemy.spawn.y }
      ));
    },
  });
});

export default gameControls;
