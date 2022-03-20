import { canvas } from './Canvas';
import { ButtonColor, ButtonStyle } from './UI';
import { Alignment } from './utilities/CanvasFunctions';

export default class Menu {
  images: {[key: string]: HTMLImageElement} = {};
  buttons: Array<any> = [];

  // eslint-disable-next-line class-methods-use-this
  load() {
    // nothing to load here yet
    document.addEventListener('mousedown', () => {
      this.buttons.forEach((button) => {
        if (MyApp.cursor.clickInBounds(button.button.x, button.button.y, button.button.width, button.button.height)) {
          button.function();
        }
      });
    });

    this.buttons.push(
      {
        button: MyApp.ui.generateButton(canvas.width / 2, canvas.height / 2, {
          position: Alignment.center,
          style: ButtonStyle.outline,
          color: ButtonColor.blue,
        }),
        function: () => console.log('test'),
      },
      {
        button: MyApp.ui.generateButton(canvas.width / 2, canvas.height / 2 + 60, {
          position: Alignment.center,
          style: ButtonStyle.solid,
          color: ButtonColor.blue,
        }),
        function: () => console.log('test2'),
      },
    );
  }

  draw(delta: number) {
    // Buttons
    this.buttons.forEach((button) => {
      button.button?.draw?.();
    });
  }
}
