import { GameStatus, MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Rand from '../utilities/Rand';
import Team from './Team';

export default class EnemyTeam extends Team {
  spawnTick = 0;
  nextSpawnPokemon: PokemonNameType = 'Caterpie';
  nextSpawnTick: number = 0;

  draw(delta: number) {
    super.draw(delta);

    // We don't want to spawn more pokemon once the game has ended
    if (this.parent.status === GameStatus.ended) return;

    // Don't bother doing anything if we already have 50 pokemon
    if (this.pokemon.size >= 50) return;

    // Spawn a pokemon in every x ms
    this.spawnTick += delta;
    if (this.spawnTick >= this.nextSpawnTick) {
      this.addPokemon(this.nextSpawnPokemon);
      this.nextSpawnPokemon = Rand.fromWeightedArray(
        ['Caterpie', 'Weedle', 'Pidgey', 'Rattata', 'Pikachu', 'Mankey', 'Snorlax'],
        [10, 10, 7, 6, 3, 3, 1]
      );

      const pokemon = pokemonMap[this.nextSpawnPokemon];
      const moneyRequired = pokemon.cost - this.money;
      if (moneyRequired <= 0) {
        // If we can afford it already, just wait some time before spawning it in
        this.nextSpawnTick = this.spawnTick + Rand.intBetween(500, 5000);
        return;
      }
      const timeToWait = Math.ceil(moneyRequired / MONEY_PER_TICK) * MONEY_TICK;
      this.nextSpawnTick = this.spawnTick + timeToWait;
    }
  }
}
