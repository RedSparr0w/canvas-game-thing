import type Team from '../player/Team';
import Pokemon from './Pokemon';
import { PokemonDirection } from './PokemonEnums';
import { PokemonNameType } from './PokemonNameType';

export default class BossPokemon extends Pokemon {
  constructor(
    parent: Team,
    name: PokemonNameType,
    spawn: {
      x: number,
      y: number,
      direction: PokemonDirection,
    } = {
      x: 0,
      y: 0,
      direction: PokemonDirection.right,
    },
    level = 1
  ) {
    super(parent, name, spawn, level);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;
    this.startMovementFrame = Infinity;
    this.paths.push([spawn.x, spawn.y]);
  }
}
