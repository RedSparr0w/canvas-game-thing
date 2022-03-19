import { context } from './Canvas';
import Cursor from './Cursor';
import { loadImage } from './utilities/Functions';

export enum ButtonStyle {
  outline = 'outline',
  solid = 'solid',
}

export enum ButtonColor {
  blue = 'none',
  purple = 'hue-rotate(58deg)',
  pink = 'hue-rotate(108deg)',
  red = 'hue-rotate(158deg)',
  orange = 'hue-rotate(180deg)',
  green = 'hue-rotate(278deg)',
}

export default class UI {
  static images: {[key: string]: HTMLImageElement} = {};

  static async load() {
    // Load our UI images
    this.images.outline_button = await loadImage('./assets/images/ui/outline_button.png');
    this.images.outline_button_pressed = await loadImage('./assets/images/ui/outline_button_pressed.png');
    this.images.solid_button = await loadImage('./assets/images/ui/solid_button.png');
    this.images.solid_button_pressed = await loadImage('./assets/images/ui/solid_button_pressed.png');
  }

  static drawButton(x: number, y: number, style = ButtonStyle.outline, color = ButtonColor.blue) {
    const buttonImage = this.images[`${style}_button`];
    context.filter = color;
    if (!Cursor.inBounds(x, y, buttonImage.width, buttonImage.height)) {
      context.drawImage(buttonImage, x, y);
    } else {
      context.drawImage(this.images[`${style}_button_pressed`], x, y);
    }
    context.filter = 'none';
  }
}
