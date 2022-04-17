import PlayerPokemon from '../../pokemons/PlayerPokemon';
import { PokemonDirection } from '../../pokemons/Pokemon';
import { pokemonMap } from '../../pokemons/PokemonList';
import { PokemonNameType } from '../../pokemons/PokemonNameType';
import Menu from '../Menu';

const gameControls = new Menu('gameControls');
const template = document.querySelector('#template-spawn-pokemon') as HTMLTemplateElement;
[...document.querySelectorAll('#gameControls [data-spawn]')].forEach((element: HTMLAnchorElement) => {
  const pokemon = pokemonMap[element.dataset.spawn];
  // Clone the new row and insert it into the table
  const clone = template.content.cloneNode(true) as HTMLElement;
  const img = clone.querySelector('.card-img-top') as HTMLImageElement;
  img.src = `assets/images/pokemonIcons/${pokemon.id.toString().padStart(3, '0')}.png`;
  const title = clone.querySelector('.card-title') as HTMLTitleElement;
  title.innerText = pokemon.name;
  const cost = clone.querySelector('.cost') as HTMLTitleElement;
  cost.innerText = `Cost: $${pokemon.cost}`;
  const spawnButton = clone.querySelector('.spawn') as HTMLAnchorElement;
  spawnButton.dataset.spawn = pokemon.name;

  element.replaceWith(clone);

  gameControls.addEventsToElement(spawnButton, {
    click: () => {
      if (MyApp.game.player.pokemon.length >= 50) return;
      MyApp.game.player.pokemon.push(new PlayerPokemon(
        MyApp.game.player,
        element.dataset.spawn as PokemonNameType,
        { x: MyApp.game.map.current.player.spawn.x, y: MyApp.game.map.current.player.spawn.y },
        PokemonDirection.right,
        { x: MyApp.game.map.current.enemy.spawn.x, y: MyApp.game.map.current.enemy.spawn.y }
      ));
    },
  });
});

export default gameControls;
