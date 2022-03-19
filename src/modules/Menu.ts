import { canvas } from './Canvas';
import UI, { ButtonColor, ButtonPosition, ButtonStyle } from './UI';

export default class Menu {
  static images: {[key: string]: HTMLImageElement} = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static draw(delta: number) {
    // Button
    UI.drawButton(canvas.width / 2, canvas.height / 2, { position: ButtonPosition.center, style: ButtonStyle.outline, color: ButtonColor.blue });
    UI.drawButton(canvas.width / 2 + 80, canvas.height / 2, { position: ButtonPosition.center, style: ButtonStyle.solid, color: ButtonColor.blue });
  }
}
