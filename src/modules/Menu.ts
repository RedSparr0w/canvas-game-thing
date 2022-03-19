import { canvas } from './Canvas';
import { POKEMON_TILE_SIZE } from './GameConstants';
import { PokemonList } from './pokemons/Pokemon';
import UI, { ButtonColor, ButtonPosition, ButtonStyle } from './UI';

export default class Menu {
  static images: {[key: string]: HTMLImageElement} = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static draw(delta: number) {
    // Buttons
    UI.drawButton(canvas.width / 2, canvas.height / 2, {
      position: ButtonPosition.center,
      style: ButtonStyle.outline,
      color: ButtonColor.blue,
      image: PokemonList[10].image,
      image_settings: {
        cropX: 0,
        cropY: 0,
        sizeX: POKEMON_TILE_SIZE,
        sizeY: POKEMON_TILE_SIZE,
      },
    });
    UI.drawButton(canvas.width / 2, canvas.height / 2 + 60, {
      position: ButtonPosition.center,
      style: ButtonStyle.solid,
      color: ButtonColor.blue,
      image: PokemonList[2].image,
      image_settings: {
        cropX: 0,
        cropY: 0,
        sizeX: POKEMON_TILE_SIZE,
        sizeY: POKEMON_TILE_SIZE,
      },
    });
  }
}
