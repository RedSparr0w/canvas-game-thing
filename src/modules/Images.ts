import { loadImage } from './utilities/Functions';

export default class Images {
  public list: Record<string, HTMLImageElement> = {};

  // TODO: map types?
  async load() {
    this.list.sparkle = await loadImage('./assets/images/pokemon/sparkle.png');
  }
}
