/* eslint-disable max-classes-per-file */
import { MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import PlayerPokemon from '../pokemons/PlayerPokemon';

export default class Player {
  pokemon: PlayerPokemon[] = [];
  map: any;
  money = 0;
  moneyTick = 0;

  setup(details: any) {
    this.map = details;
    this.moneyTick = 0;
    this.money = 0;
  }

  draw(delta: number) {
    this.moneyTick += delta;

    // Calculate our money
    if (this.moneyTick >= MONEY_TICK) {
      this.moneyTick -= MONEY_TICK;
      this.money += MONEY_PER_TICK;
    }

    // Process our Pokemon
    this.pokemon.forEach((pokemon) => {
      pokemon.draw(delta);
    });
  }
}
