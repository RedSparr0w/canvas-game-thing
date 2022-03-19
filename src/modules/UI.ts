// eslint-disable-next-line import/no-cycle
import App from './App';
import { context } from './Canvas';
import { loadImage } from './utilities/Functions';

export default class UI {
  public images: {[key: string]: HTMLImageElement} = {};

  async load() {
    // Load our UI images
    this.images.blue_button = await loadImage('./assets/images/ui/blue_button.png');
    this.images.blue_button_pressed = await loadImage('./assets/images/ui/blue_button_pressed.png');
  }

  drawButton(x: number, y: number, color = 'blue') {
    const buttonImage = this.images[`${color}_button`];
    if (!App.cursor.inBounds(x, y, buttonImage.width, buttonImage.height)) {
      context.drawImage(buttonImage, x, y);
    } else {
      context.drawImage(this.images[`${color}_button_pressed`], x, y);
    }
  }
}
