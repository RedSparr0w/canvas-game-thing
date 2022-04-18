import type Player from '../player/Player';
import EnemyPokemon from './EnemyPokemon';
import { PokemonDirection } from './Pokemon';
import { PokemonNameType } from './PokemonNameType';

export default class EnemyBossPokemon extends EnemyPokemon {
  constructor(
    parent: Player,
    name: PokemonNameType,
    spawn: { x: number, y: number },
    direction = PokemonDirection.right,
    level = 1
  ) {
    super(parent, name, spawn, direction, level);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;
    this.startMovementFrame = Infinity;
    this.paths.push([spawn.x, spawn.y]);
  }
}
