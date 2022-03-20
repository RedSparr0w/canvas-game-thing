import { context } from './Canvas';
import { loadImage } from './utilities/Functions';

export enum ButtonPosition {
  top_left,
  top_right,
  bottom_left,
  bottom_right,
  center,
}

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

  drawButton(posX: number, posY: number, {
    position = ButtonPosition.top_left,
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
    let x = posX;
    let y = posY;

    // Load our image
    let buttonImage = this.images[`${style}_button`];

    // eslint-disable-next-line default-case
    switch (position) {
      case ButtonPosition.top_right:
        x -= buttonImage.width;
        break;
      case ButtonPosition.bottom_left:
        y -= buttonImage.height;
        break;
      case ButtonPosition.bottom_right:
        x -= buttonImage.width;
        y -= buttonImage.height;
        break;
      case ButtonPosition.center:
        x -= buttonImage.width / 2;
        y -= buttonImage.height / 2;
        break;
    }

    // Round our x and y values
    x = Math.round(x);
    y = Math.round(y);

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
