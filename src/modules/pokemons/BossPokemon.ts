import type Team from '../player/Team';
import Pokemon from './Pokemon';
import { SpawnPosition } from './PokemonEnums';
import { PokemonNameType } from './PokemonNameType';

export default class BossPokemon extends Pokemon {
  constructor(
    parent: Team,
    name: PokemonNameType,
    spawn: SpawnPosition
  ) {
    super(parent, name, spawn);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;
    this.startMovementFrame = Infinity;
    this.paths.push([spawn.x, spawn.y]);
  }
}
