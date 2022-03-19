import './temporaryWindowInjection';
import { scale, canvas } from './Canvas';
import { Settings } from './utilities/Settings';
import { MAP_TILE_SIZE } from './GameConstants';
import App from './App';
import Cursor, { CursorStyle } from './Cursor';
import Game from './Game';

window.onload = async () => {
  let drag = false;
  let dragStart;
  let dragEnd;

  document.addEventListener('mousedown', () => {
    Cursor.style = CursorStyle.pointed;
    if (Cursor.inBounds(0, 0, window.innerWidth, Game.map.height * MAP_TILE_SIZE)) {
      dragStart = Cursor.x;
      drag = true;
    }
  });
  document.addEventListener('mousemove', (event) => {
    // Update our cursors position
    Cursor.x = Math.floor(event.pageX / scale);
    Cursor.y = Math.floor(event.pageY / scale);

    if (drag) {
      dragEnd = Cursor.x;
      const movement = Math.floor(Math.abs(dragEnd - dragStart));
      if (!movement) return;
      Settings.camera = Math.max(0, Math.min(Game.map.width * MAP_TILE_SIZE - canvas.width, Settings.camera + (dragEnd > dragStart ? -movement : movement)));
      dragStart = dragEnd;
    }
  });
  document.addEventListener('mouseup', () => {
    Cursor.style = CursorStyle.pointer;
    drag = false;
  });
  document.addEventListener('wheel', (event) => {
    const movement = event.deltaY / 5;
    if (!movement) return;
    Settings.camera = Math.max(0, Math.min(4800 - canvas.width, Settings.camera + movement));
  });

  App.load();
};
