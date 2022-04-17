import { loadImage } from './utilities/Functions';

export default class Images {
  public list: Record<string, HTMLImageElement> = {};

  // TODO: map types?
  async load() {
    this.list.sparkle = await loadImage('./assets/images/pokemon/sparkle.png');
    this.list.pokemon_bar = await loadImage('./assets/images/pokemon_bar.png');
    this.list.pokemon_bar_3 = await loadImage('./assets/images/pokemon_bar_3.png');
    this.list.tiny_numbers = await loadImage('./assets/images/tiny_number.png');
  }
}
