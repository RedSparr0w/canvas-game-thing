import { loadImage } from './utilities/Functions';

export default class Menu {
  public images: {[key: string]: HTMLImageElement} = {};

  async load() {
    // Load our UI images
    this.images.blue_button = await loadImage('./assets/images/ui/blue_button.png');
  }
}
