// TODO: Remove temporary code in production
// This is only here so these values can be accessed from the console

import * as GameConstants from './GameConstants';
import { Settings } from './utilities/Settings';
import { canvas, context } from './Canvas';
import App from './App';
import Game from './Game';
import Menus from './menu/Menus';
import Cursor from './Cursor';
import Player from './player/Player';
import Enemy from './player/Enemy';

Object.assign(<any>window, {
  Settings,
  GameConstants,
  canvas,
  context,
  App,
  Game,
  Menus,
  Cursor,
  Player,
  Enemy,
});
