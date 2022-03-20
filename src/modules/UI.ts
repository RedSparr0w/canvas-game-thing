import { context } from './Canvas';
import { alignImage, Alignment } from './utilities/CanvasFunctions';
import { loadImage } from './utilities/Functions';

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

export default class UI {
  images: {[key: string]: HTMLImageElement} = {};

  async load() {
    // Load our UI images
    this.images.outline_button = await loadImage('./assets/images/ui/outline_button.png');
    this.images.outline_button_pressed = await loadImage('./assets/images/ui/outline_button_pressed.png');
    this.images.solid_button = await loadImage('./assets/images/ui/solid_button.png');
    this.images.solid_button_pressed = await loadImage('./assets/images/ui/solid_button_pressed.png');
  }

  generateButton(posX: number, posY: number, {
    position = Alignment.top_left,
    style = ButtonStyle.outline,
    color = ButtonColor.blue,
  }) {
    // Load our image
    const buttonImage = this.images[`${style}_button`];
    const buttonImagePressed = this.images[`${style}_button_pressed`];

    const { x, y } = alignImage(buttonImage, posX, posY, position);

    return {
      x,
      y,
      width: buttonImage.width,
      height: buttonImage.height,
      draw: () => {
        let image = buttonImage;

        if (MyApp.cursor.clickInBounds(x, y, buttonImage.width, buttonImage.height)) {
          image = buttonImagePressed;
        }

        // Apply color
        context.filter = color;

        // On hover, apply filter effects
        if (MyApp.cursor.inBounds(x, y, image.width, image.height)) {
          // context.filter += ' drop-shadow(0px 0px 1px #fefefe)';
          // context.filter += ' contrast(110%)';
          context.filter += ' brightness(105%)';
        }

        context.drawImage(image, x, y);
        context.filter = 'none';
      },
    };
  }

  drawButton(posX: number, posY: number, {
    position = Alignment.top_left,
    style = ButtonStyle.outline,
    color = ButtonColor.blue,
    image = null,
    image_settings = {
      cropX: 0,
      cropY: 0,
      sizeX: 0,
      sizeY: 0,
    },
  }) {
    // Load our image
    let buttonImage = this.images[`${style}_button`];

    const { x, y } = alignImage(buttonImage, posX, posY, position);

    if (MyApp.cursor.clickInBounds(x, y, buttonImage.width, buttonImage.height)) {
      buttonImage = this.images[`${style}_button_pressed`];
    }

    // Apply color
    context.filter = color;

    // On hover, apply filter effects
    if (MyApp.cursor.inBounds(x, y, buttonImage.width, buttonImage.height)) {
      // context.filter += ' drop-shadow(0px 0px 1px #fefefe)';
      // context.filter += ' contrast(110%)';
      context.filter += ' brightness(105%)';
    }

    context.drawImage(buttonImage, x, y);
    context.filter = 'none';

    // Draw our text if we have some
    if (image) {
      const imgX = x + 2;// + Math.floor(buttonImage.width / 2) - Math.floor(image_settings.sizeX / 2);
      const imgY = y - 3;// + Math.floor(buttonImage.height / 2) - Math.floor(image_settings.sizeY / 2);
      // context.drawImage(image, imgX, imgY);
      // context.fillStyle = '#222';
      // context.fillRect(imgX, imgY, image_settings.sizeX, image_settings.sizeY);
      context.drawImage(image, image_settings.cropX, image_settings.cropY, image_settings.sizeX, image_settings.sizeY, imgX, imgY, buttonImage.width - 4, buttonImage.width - 4);
    }
  }
}
