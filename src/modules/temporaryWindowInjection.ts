// TODO: Remove temporary code in production
// This is only here so these values can be accessed from the console

import * as GameConstants from './GameConstants';
import { Settings, Values } from './utilities/Settings';

Object.assign(<any>window, {
  Settings,
  Values,
  GameConstants,
});
