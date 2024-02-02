import { GameStatus, MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Rand from '../utilities/Rand';
import Team from './Team';

export default class EnemyTeam extends Team {
  currentTick = 0;
  nextSpawnPokemon: PokemonNameType = 'Caterpie';
  nextSpawnTick: number = 0;

  draw(delta: number) {
    super.draw(delta);

    // We don't want to spawn more pokemon once the game has ended
    if (this.parent.status === GameStatus.ended) return;

    // Don't bother doing anything if we already have 50 pokemon
    if (this.pokemon.size >= 50) return;

    // Spawn a pokemon in every x ms
    this.currentTick += delta;
    if (this.currentTick >= this.nextSpawnTick) {
      // Decide if we want to summon a pokemon or level up a pokemon
      if (Rand.chance(5)) {
        this.addPokemonLevel(this.nextSpawnPokemon);
      } else {
        this.addPokemon(this.nextSpawnPokemon);
      }

      this.nextSpawnPokemon = Rand.fromWeightedArray(
        ['Caterpie', 'Weedle', 'Pidgey', 'Rattata'],
        [10, 10, 7, 6]
      );

      const moneyRequired = this.getPokemonCost(this.nextSpawnPokemon) - this.money;
      // If we can afford it already, just wait some time before spawning it in
      if (moneyRequired <= 0) {
        this.nextSpawnTick = this.currentTick + Rand.intBetween(500, 5000);
        return;
      }
      // Wait until we can afford the pokemon
      const timeToWait = Math.ceil(moneyRequired / MONEY_PER_TICK) * MONEY_TICK;
      this.nextSpawnTick = this.currentTick + timeToWait;
    }
  }
}
