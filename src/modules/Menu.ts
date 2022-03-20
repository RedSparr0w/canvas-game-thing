import { canvas } from './Canvas';
import Button, { ButtonColor, ButtonStyle } from './ui/button';
import { Alignment } from './utilities/CanvasFunctions';
import { LogDebug } from './utilities/Logging';

export default class Menu {
  images: {[key: string]: HTMLImageElement} = {};
  buttons: Array<Button> = [];
  visible = true;

  // eslint-disable-next-line class-methods-use-this
  load() {
    // nothing to load here yet
    document.addEventListener('mousedown', () => {
      // If menu not currently shown, don't do anything
      if (!this.visible) return;

      // Check if any of our buttons were clicked
      this.buttons.forEach((button) => {
        const { x, y } = button.getPosition();
        if (MyApp.cursor.clickInBounds(x, y, button.buttonImage.width, button.buttonImage.height)) {
          button.func();
        }
      });
    });

    // Add our buttons
    this.buttons.push(
      new Button(
        () => canvas.width / 2,
        () => canvas.height / 2,
        ButtonStyle.outline,
        ButtonColor.blue,
        Alignment.center,
        async () => {
          this.visible = false;
          await MyApp.game.start('route1');
          MyApp.drawFunction = (delta: number) => MyApp.game.draw(delta);
        }
      ),
      new Button(
        () => canvas.width / 2,
        () => canvas.height / 2 + 60,
        ButtonStyle.solid,
        ButtonColor.blue,
        Alignment.center,
        () => LogDebug('2nd button clicked')
      )
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(delta: number) {
    // Draw our buttons
    this.buttons.forEach((button) => {
      button.draw();
    });
  }
}
