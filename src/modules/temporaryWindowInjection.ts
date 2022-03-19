// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import * as GameConstants from './GameConstants';
import PokemonType from './enums/PokemonType';
import SeededRand from './utilities/SeededRand';
import Rand from './utilities/Rand';
import LevelType, { levelRequirements } from './party/LevelType';
import GenericProxy from './utilities/GenericProxy';
import * as Settings from './utilities/Settings';

Object.assign(<any>window, {
  Settings,
  GameConstants,
  PokemonType,
  SeededRand,
  Rand,
  LevelType,
  levelRequirements,
  GenericProxy,
});
