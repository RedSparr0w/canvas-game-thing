/* eslint-disable max-classes-per-file */
import { MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import PlayerBossPokemon from '../pokemons/PlayerBossPokemon';
import PlayerPokemon from '../pokemons/PlayerPokemon';
import { PokemonDirection } from '../pokemons/Pokemon';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class Player {
  pokemon: Set<PlayerPokemon> = new Set();
  map: any;
  money = 0;
  moneyTick = 0;
  moneyEl = document.getElementById('player-money');

  // eslint-disable-next-line class-methods-use-this
  async load() {
    // load our assets?
  }

  setup(details: any) {
    this.map = details;
    this.moneyTick = 0;
    this.money = 0;
    this.pokemon = new Set();
    this.loadBoss();
  }

  loadBoss() {
    this.pokemon.add(new PlayerBossPokemon(
      this,
      'Charizard',
      { x: this.map.player.spawn.x, y: this.map.player.spawn.y },
      PokemonDirection.right,
      { x: this.map.enemy.spawn.x, y: this.map.enemy.spawn.y },
      15
    ));
  }

  draw(delta: number) {
    this.moneyTick += delta;

    // Calculate our money
    if (this.moneyTick >= MONEY_TICK) {
      this.moneyTick -= MONEY_TICK;
      this.updateMoney(MONEY_PER_TICK);
    }

    // Process our Pokemon
    this.pokemon.forEach((pokemon) => {
      pokemon.draw(delta);
    });
  }

  updateMoney(amount: number) {
    this.money += amount;
    this.moneyEl.innerText = `Money: $${this.money}`;
  }

  canAddPokemon(name: PokemonNameType): boolean {
    if (this.pokemon.size >= 50) return false;

    const pokemon = pokemonMap[name];

    if (this.money < pokemon.cost) return false;

    return true;
  }

  addPokemon(name: PokemonNameType) {
    if (!this.canAddPokemon(name)) return;

    const pokemon = pokemonMap[name];
    this.updateMoney(-pokemon.cost);

    this.pokemon.add(new PlayerPokemon(
      this,
      name,
      { x: this.map.player.spawn.x, y: this.map.player.spawn.y },
      PokemonDirection.right,
      { x: this.map.enemy.spawn.x, y: this.map.enemy.spawn.y },
      1
    ));
  }
}
