import { canvas, context } from './Canvas';
import { Maps } from './Maps';
import { PokemonList } from './pokemons/Pokemon';
import UI, { ButtonColor, ButtonStyle } from './UI';
import { drawFrame } from './utilities/CanvasFunctions';
import { loadImage } from './utilities/Functions';
import { Settings } from './utilities/Settings';

export default class Game {
  static images: {[key: string]: HTMLImageElement} = {};
  static map = Maps.route1;

  static async load() {
    // Load our map images
    this.images.map = await loadImage(this.map.image);
    this.images.map_top = await loadImage(this.map.image_top);
  }

  static draw(delta) {
    /*
    Draw our game map
    */
    context.drawImage(this.images.map, -Settings.camera, 0);
    PokemonList.forEach((pokemon) => {
      pokemon.draw(delta);
    });
    // overlayed images (should appear above stuff on the map)
    context.drawImage(this.images.map_top, -Settings.camera, 0);

    /*
    Draw our game menu stuff
    */
    drawFrame(0, 480, canvas.width, 120);
    // Button
    UI.drawButton(6, canvas.height - 114, ButtonStyle.outline, ButtonColor.green);
    UI.drawButton(60, canvas.height - 114, ButtonStyle.outline, ButtonColor.red);
    UI.drawButton(114, canvas.height - 114, ButtonStyle.outline, ButtonColor.blue);
    UI.drawButton(168, canvas.height - 114, ButtonStyle.outline, ButtonColor.orange);
    UI.drawButton(222, canvas.height - 114, ButtonStyle.outline, ButtonColor.pink);
    UI.drawButton(276, canvas.height - 114, ButtonStyle.outline, ButtonColor.purple);
    // if (!inBounds(Cursor.x, Cursor.y, 84, canvas.height - images[2].height - 65, images[2].width, images[2].height)) {
    //   context.drawImage(images[2], 84, canvas.height - images[2].height - 65);
    // } else {
    //   context.drawImage(images[3], 84, canvas.height - images[3].height - 65);
    // }
  }
}
