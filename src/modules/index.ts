import './temporaryWindowInjection';
import { scale, canvas } from './Canvas';
import { Settings } from './utilities/Settings';
import { MAP_TILE_SIZE } from './GameConstants';
import App from './App';
import { CursorStyle } from './Cursor';

window.onload = async () => {
  let drag = false;
  let dragStart;
  let dragEnd;

  document.addEventListener('mousedown', () => {
    App.cursor.style = CursorStyle.pointed;
    if (App.cursor.inBounds(0, 0, window.innerWidth, App.game.map.height * MAP_TILE_SIZE)) {
      dragStart = App.cursor.x;
      drag = true;
    }
  });
  document.addEventListener('mousemove', (event) => {
    // Update our cursors position
    App.cursor.x = Math.floor(event.pageX / scale);
    App.cursor.y = Math.floor(event.pageY / scale);

    if (drag) {
      dragEnd = App.cursor.x;
      const movement = Math.floor(Math.abs(dragEnd - dragStart));
      if (!movement) return;
      Settings.camera = Math.max(0, Math.min(App.game.map.width * MAP_TILE_SIZE - canvas.width, Settings.camera + (dragEnd > dragStart ? -movement : movement)));
      dragStart = dragEnd;
    }
  });
  document.addEventListener('mouseup', () => {
    App.cursor.style = CursorStyle.pointer;
    drag = false;
  });
  document.addEventListener('wheel', (event) => {
    const movement = event.deltaY / 5;
    if (!movement) return;
    Settings.camera = Math.max(0, Math.min(4800 - canvas.width, Settings.camera + movement));
  });

  App.load();
};
