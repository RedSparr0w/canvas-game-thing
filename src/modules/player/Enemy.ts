/* eslint-disable max-classes-per-file */
import EnemyBossPokemon from '../pokemons/EnemyBossPokemon';
import EnemyPokemon from '../pokemons/EnemyPokemon';
import { PokemonDirection } from '../pokemons/Pokemon';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Rand from '../utilities/Rand';
import Player from './Player';

export default class Enemy extends Player {
  pokemon: Set<EnemyPokemon> = new Set();
  spawnTick = 0;

  loadBoss() {
    this.pokemon.add(new EnemyBossPokemon(
      this,
      'Charizard',
      { x: this.map.enemy.spawn.x, y: this.map.enemy.spawn.y },
      PokemonDirection.left,
      { x: this.map.player.spawn.x, y: this.map.player.spawn.y },
      15
    ));
  }

  draw(delta: number) {
    super.draw(delta);

    this.spawnTick += delta;
    if (this.spawnTick >= 1500) {
      this.spawnTick -= 1500;
      this.addPokemon(Rand.fromArray(['Rattata', 'Pikachu', 'Pidgey', 'Caterpie', 'Weedle', 'Mankey']));
    }
  }

  updateMoney(amount: number) {
    this.money += amount;
  }

  addPokemon(name: PokemonNameType) {
    if (!this.canAddPokemon(name)) return;

    const pokemon = pokemonMap[name];
    this.updateMoney(-pokemon.cost);

    this.pokemon.add(new EnemyPokemon(
      this,
      name,
      { x: this.map.enemy.spawn.x, y: this.map.enemy.spawn.y },
      PokemonDirection.left,
      { x: this.map.player.spawn.x, y: this.map.player.spawn.y },
      1
    ));
  }
}
