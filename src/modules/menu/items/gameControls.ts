import { pokemonMap } from '../../pokemons/PokemonList';
import { PokemonNameType } from '../../pokemons/PokemonNameType';
import Menu from '../Menu';

const gameControls = new Menu('gameControls');
const template = document.querySelector('#template-spawn-pokemon') as HTMLTemplateElement;
// TODO: we need to set these values when a map is loaded
[...document.querySelectorAll('#gameControls [data-spawn]')].forEach((element: HTMLAnchorElement) => {
  const pokemon = pokemonMap[element.dataset.spawn];
  // Clone the new row and insert it into the table
  const clone = template.content.cloneNode(true) as HTMLElement;
  const img = clone.querySelector('img') as HTMLImageElement;
  img.src = `assets/images/pokemonIcons/${pokemon.id.toString().padStart(3, '0')}.png`;
  const title = clone.querySelector('.card-title') as HTMLTitleElement;
  title.innerText = pokemon.name;
  const cost = clone.querySelector('.cost') as HTMLTitleElement;
  cost.innerText = `$${typeof MyApp !== 'undefined' ? MyApp.game.player.getPokemonCost(element.dataset.spawn) : pokemon.cost + 10}`;
  const level = clone.querySelector('.level') as HTMLTitleElement;
  level.innerText = `Level ${typeof MyApp !== 'undefined' ? MyApp.game.teams[0].getPokemonLevel(element.dataset.spawn) : 1}`;
  const spawnButton = clone.querySelector('.spawn') as HTMLAnchorElement;
  spawnButton.dataset.spawn = pokemon.name;
  const levelButton = clone.querySelector('.level-up') as HTMLAnchorElement;
  levelButton.dataset.spawn = pokemon.name;

  element.replaceWith(clone);

  gameControls.addEventsToElement(spawnButton, {
    click: () => {
      MyApp.game.player.addPokemon(element.dataset.spawn as PokemonNameType);
    },
  });

  gameControls.addEventsToElement(levelButton, {
    click: () => {
      const success: number = MyApp.game.player.addPokemonLevel(element.dataset.spawn as PokemonNameType);
      if (success) {
        cost.innerText = `$${MyApp.game.player.getPokemonCost(element.dataset.spawn)}`;
        level.innerText = `Level ${MyApp.game.player.getPokemonLevel(element.dataset.spawn as PokemonNameType)}`;
      }
    },
  });
});

export default gameControls;
