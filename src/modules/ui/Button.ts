import { context } from '../Canvas';
import { alignImage, Alignment } from '../utilities/CanvasFunctions';
import { loadImage } from '../utilities/Functions';

export enum ButtonStyle {
  outline = 'outline',
  solid = 'solid',
}

export enum ButtonColor {
  blue = 'hue-rotate(0deg)',
  purple = 'hue-rotate(58deg)',
  pink = 'hue-rotate(108deg)',
  red = 'hue-rotate(158deg)',
  orange = 'hue-rotate(180deg)',
  green = 'hue-rotate(278deg)',
}

export default class Button {
  static images: {[key: string]: HTMLImageElement} = {};

  public buttonImage: HTMLImageElement;
  public buttonImagePressed: HTMLImageElement;

  constructor(
    public posX: () => number,
    public posY: () => number,
    public style = ButtonStyle.outline,
    public color = ButtonColor.blue,
    public position = Alignment.top_left,
    public func = () => {}
  ) {
    this.buttonImage = Button.images[`${this.style}_button`];
    this.buttonImagePressed = Button.images[`${this.style}_button_pressed`];
  }

  static async load() {
    // Load our UI images
    this.images.outline_button = await loadImage('./assets/images/ui/outline_button.png');
    this.images.outline_button_pressed = await loadImage('./assets/images/ui/outline_button_pressed.png');
    this.images.solid_button = await loadImage('./assets/images/ui/solid_button.png');
    this.images.solid_button_pressed = await loadImage('./assets/images/ui/solid_button_pressed.png');
  }

  getPosition() {
    return alignImage(this.buttonImage, this.posX(), this.posY(), this.position);
  }

  draw() {
    const { x, y } = alignImage(this.buttonImage, this.posX(), this.posY(), this.position);

    let image = this.buttonImage;

    if (MyApp.cursor.clickInBounds(x, y, image.width, image.height)) {
      image = this.buttonImagePressed;
    }

    // Apply color
    context.filter = this.color;

    // On hover, apply filter effects
    if (MyApp.cursor.inBounds(x, y, image.width, image.height)) {
      // context.filter += ' drop-shadow(0px 0px 1px #fefefe)';
      // context.filter += ' contrast(110%)';
      context.filter += ' brightness(105%)';
    }

    context.drawImage(image, x, y);
    context.filter = 'none';
  }
}
