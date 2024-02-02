/* eslint-disable max-classes-per-file */
import type Game from '../Game';
import { MONEY_PER_TICK, MONEY_TICK } from '../GameConstants';
import BossPokemon from '../pokemons/BossPokemon';
import Pokemon from '../pokemons/Pokemon';
import { SpawnPosition } from '../pokemons/PokemonEnums';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class Team {
  pokemon: Set<Pokemon> = new Set();
  money = 0;
  moneyTick = 0;
  map: { spawn: SpawnPosition, boss: SpawnPosition };
  boss: BossPokemon;
  pokemonLevel: Record<string, number> = {};
  availablePokemon: Set<PokemonNameType> = new Set(['Caterpie', 'Weedle', 'Pidgey', 'Rattata']);

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
    this.pokemonLevel = {};
    this.loadBoss();
  }

  loadBoss() {
    this.boss = new BossPokemon(
      this,
      this.map.boss.pokemon || 'Rattata',
      {
        x: this.map.boss.x,
        y: this.map.boss.y,
        direction: this.map.boss.direction,
        level: this.map.boss.level || 15,
      }
    );
    this.pokemon.add(this.boss);
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

  canAffordPokemon(name: PokemonNameType): boolean {
    // Too many pokemon on field already
    if (this.pokemon.size >= 50) return false;

    // Not enough money
    if (this.money < this.getPokemonCost(name)) return false;

    return true;
  }

  addPokemon(name: PokemonNameType) {
    if (!this.canAffordPokemon(name)) return;

    // Charge costs to summon pokemon
    this.updateMoney(-this.getPokemonCost(name));

    this.pokemon.add(new Pokemon(
      this,
      name,
      {
        x: this.map.spawn.x,
        y: this.map.spawn.y,
        direction: this.map.spawn.direction,
        level: this.getPokemonLevel(name),
      }
    ));
  }

  addPokemonLevel(name: PokemonNameType) {
    // Check if we can afford the level up
    if (!this.canAffordPokemon(name)) return false;

    // Cap at level 99
    if (this.getPokemonLevel(name) >= 99) return false;

    // Charge costs to level up
    this.updateMoney(-this.getPokemonCost(name));

    // TODO: Auto evolve if high enough level
    this.pokemonLevel[name] = (this.pokemonLevel[name] ?? 0) + 1;
    return true;
  }

  getPokemonLevel(name: PokemonNameType) {
    return (this.map.spawn.level ?? 1) + (this.pokemonLevel[name] ?? 0);
  }

  getPokemonCost(name: PokemonNameType) {
    const baseCost = pokemonMap[name].cost;
    const level = this.getPokemonLevel(name);
    // Increase base cost based on level
    let cost = baseCost + (level * 5);
    // Power function to increase cost
    cost **= 1 + (level / 100);
    // Floor to the nearest 5
    cost = Math.floor(cost / 5) * 5;
    return cost;
  }
}
