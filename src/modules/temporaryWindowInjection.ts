// TODO: Remove temporary code in production
// This is only here so these values can be accessed from the console

import * as GameConstants from './GameConstants';
import { Settings } from './utilities/Settings';
import { canvas, context } from './Canvas';

Object.assign(<any>window, {
  Settings,
  GameConstants,
  canvas,
  context,
});
