import { canvas } from './Canvas';
import { ButtonColor, ButtonPosition, ButtonStyle } from './UI';

export default class Menu {
  images: {[key: string]: HTMLImageElement} = {};

  // eslint-disable-next-line class-methods-use-this
  load() {
    // nothing to load here yet
  }

  // eslint-disable-next-line class-methods-use-this
  draw(delta: number) {
    // eslint-disable-next-line no-console
    console.log(delta);
    // Buttons
    MyApp.ui.drawButton(canvas.width / 2, canvas.height / 2, {
      position: ButtonPosition.center,
      style: ButtonStyle.outline,
      color: ButtonColor.blue,
    });
    MyApp.ui.drawButton(canvas.width / 2, canvas.height / 2 + 60, {
      position: ButtonPosition.center,
      style: ButtonStyle.solid,
      color: ButtonColor.blue,
    });
  }
}
