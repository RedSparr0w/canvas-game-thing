/* eslint-disable max-classes-per-file */
import type Game from '../Game';
import { MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import PlayerBossPokemon from '../pokemons/BossPokemon';
import Pokemon from '../pokemons/Pokemon';
import { SpawnPosition } from '../pokemons/PokemonEnums';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class Team {
  pokemon: Set<Pokemon> = new Set();
  money = 0;
  moneyTick = 0;
  moneyEl = document.getElementById('player-money');
  map: { spawn: SpawnPosition, boss: SpawnPosition };

  constructor(public parent: Game) {}

  // eslint-disable-next-line class-methods-use-this
  async load() {
    // load our assets?
  }

  setup(mapData: { spawn: SpawnPosition, boss: SpawnPosition }) {
    this.map = mapData;
    this.moneyTick = 0;
    this.money = 0;
    this.pokemon.clear();
    this.loadBoss();
  }

  loadBoss() {
    this.pokemon.add(new PlayerBossPokemon(
      this,
      'Charizard',
      { x: this.map.boss.x, y: this.map.boss.y, direction: this.map.boss.direction },
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

    this.pokemon.add(new Pokemon(
      this,
      name,
      { x: this.map.spawn.x, y: this.map.spawn.y, direction: this.map.spawn.direction },
      1
    ));
  }
}
