import type Player from '../player/Player';
import PlayerPokemon from './PlayerPokemon';
import { PokemonDirection } from './Pokemon';
import { PokemonNameType } from './PokemonNameType';

export default class PlayerBossPokemon extends PlayerPokemon {
  constructor(
    parent: Player,
    name: PokemonNameType,
    spawn: { x: number, y: number },
    direction = PokemonDirection.right,
    // TODO: calculate based on enemy position/spawn
    destination: { x: number, y: number },
    level = 1
  ) {
    super(parent, name, spawn, direction, destination, level);
    this.currentPosition.x = spawn.x;
    this.currentPosition.y = spawn.y;
    this.startMovementFrame = Infinity;
    this.paths.push([spawn.x, spawn.y]);
  }
}