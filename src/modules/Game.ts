/* eslint-disable import/no-cycle */
import App from './App';
import { canvas, context } from './Canvas';
import { Maps } from './Maps';
import { PokemonList } from './pokemons/Pokemon';
import { ButtonColor, ButtonStyle } from './UI';
import { drawFrame } from './utilities/CanvasFunctions';
import { loadImage } from './utilities/Functions';
import { Settings } from './utilities/Settings';

export default class Game {
  public images: {[key: string]: HTMLImageElement} = {};
  public map = Maps.route1;

  async load() {
    // Load our map images
    this.images.map = await loadImage(this.map.image);
    this.images.map_top = await loadImage(this.map.image_top);
  }

  public draw(delta) {
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
    App.ui.drawButton(6, canvas.height - 114, ButtonStyle.outline, ButtonColor.green);
    App.ui.drawButton(60, canvas.height - 114, ButtonStyle.outline, ButtonColor.red);
    App.ui.drawButton(114, canvas.height - 114, ButtonStyle.outline, ButtonColor.blue);
    App.ui.drawButton(168, canvas.height - 114, ButtonStyle.outline, ButtonColor.orange);
    App.ui.drawButton(222, canvas.height - 114, ButtonStyle.outline, ButtonColor.pink);
    App.ui.drawButton(276, canvas.height - 114, ButtonStyle.outline, ButtonColor.purple);
    // if (!inBounds(Cursor.x, Cursor.y, 84, canvas.height - images[2].height - 65, images[2].width, images[2].height)) {
    //   context.drawImage(images[2], 84, canvas.height - images[2].height - 65);
    // } else {
    //   context.drawImage(images[3], 84, canvas.height - images[3].height - 65);
    // }
  }
}
