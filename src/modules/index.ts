import './temporaryWindowInjection';
import { scale, canvas, context } from './Canvas';
import { Settings, Values, fpsGraph } from './utilities/Settings';
import { loadImage } from './utilities/Functions';
import { PokemonList, Pokemon } from './pokemons/Pokemon';
import Cursor from './Cursor';

const images = [];

const loadImages = async () => {
  let img = await loadImage(Settings.map.image);
  images.push(img);
  img = await loadImage(Settings.map.image_top);
  images.push(img);
  img = await loadImage('./assets/images/ui/blue_button.png');
  images.push(img);
  img = await loadImage('./assets/images/ui/blue_button_pressed.png');
  images.push(img);
};

window.onload = async () => {
  let drag = false;
  let dragStart;
  let dragEnd;

  const inBounds = (x, y, minX, minY, width, height):boolean => {
    const maxX = minX + width;
    const maxY = minY + height;
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };
  document.addEventListener('mousedown', (event) => {
    const x = Math.floor(event.pageX / scale);
    const y = Math.floor(event.pageY / scale);
    if (inBounds(x, y, 84, canvas.height - images[2].height - 65, images[2].width, images[2].height)) {
      PokemonList.push(new Pokemon('Rattata', 19));
      return;
    }

    dragStart = event.pageX;
    drag = true;
  });
  document.addEventListener('mousemove', (event) => {
    const x = Math.floor(event.pageX / scale);
    const y = Math.floor(event.pageY / scale);
    if (drag) {
      dragEnd = event.pageX;
      const movement = Math.floor(Math.abs((dragEnd - dragStart) / scale));
      if (!movement) return;
      Settings.camera = Math.max(0, Math.min(4800 - canvas.width, Settings.camera + (dragEnd > dragStart ? -movement : movement)));
      dragStart = dragEnd;
    }
    Cursor.x = x;
    Cursor.y = y;
  });
  document.addEventListener('mouseup', () => {
    drag = false;
  });
  document.addEventListener('wheel', (event) => {
    const movement = event.deltaY / 5;
    if (!movement) return;
    Settings.camera = Math.max(0, Math.min(4800 - canvas.width, Settings.camera + movement));
  });

  await loadImages();

  const drawFrame = (x, y, width, height, color = '#1EA7E1') => {
    context.fillStyle = '#222';
    context.fillRect(x, y, width, height);
    context.fillStyle = color;
    context.fillRect(x + 2, y + 2, width - 4, height - 4);
    context.fillStyle = '#333';
    context.fillRect(x + 5, y + 5, width - 10, height - 10);
  };

  let frame = 0;
  const draw = (delta = 0) => {
    frame += delta;

    /*
    Draw our game map
    */
    context.drawImage(images[0], -Settings.camera, 0);
    PokemonList.forEach((pokemon) => {
      pokemon.draw(delta);
    });
    context.drawImage(images[1], -Settings.camera, 0);

    /*
    Draw our game menu stuff
    */
    drawFrame(0, 480, canvas.width, 120);
    // Button
    if (!inBounds(Cursor.x, Cursor.y, 84, canvas.height - images[2].height - 65, images[2].width, images[2].height)) {
      context.drawImage(images[2], 84, canvas.height - images[2].height - 65);
    } else {
      context.drawImage(images[3], 84, canvas.height - images[3].height - 65);
    }

    /*
    MOUSE
    */
    context.drawImage(Cursor.image, Cursor.pointer.x, Cursor.pointer.y, Settings.cursor_size, Settings.cursor_size, Cursor.x - 10, Cursor.y - 20, Settings.cursor_size, Settings.cursor_size);
  };

  // the last frame time
  const update = (time): void => {
    fpsGraph.begin();
    const delta = time - frame;
    // skip the frame if the call is too early
    if (delta < Values.mspf) {
      requestAnimationFrame(update);
      return;
    }

    // Set our background color
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw to our canvas
    draw(delta);

    fpsGraph.end();
    // Update last frame time
    frame = time;
    // start next frame
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update); // start animation
};
