/* eslint-disable max-classes-per-file */
import EnemyPokemon from '../pokemons/EnemyPokemon';
import { PokemonDirection } from '../pokemons/Pokemon';
import Player from './Player';

export default class Enemy extends Player {
  pokemon: EnemyPokemon[] = [];
  spawnTick = 0;

  draw(delta: number) {
    this.spawnTick += delta;
    if (this.spawnTick >= 1500) {
      this.spawnTick -= 1500;
      if (this.pokemon.length < 100) {
        this.pokemon.push(new EnemyPokemon(
          'Rattata',
          { x: this.map.enemy.spawn.x, y: this.map.enemy.spawn.y },
          PokemonDirection.left,
          { x: this.map.player.spawn.x, y: this.map.player.spawn.y }
        ));
      }
    }
    super.draw(delta);
  }
}