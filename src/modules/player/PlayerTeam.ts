import { Modal } from 'bootstrap';
import { GameStatus } from '../GameConstants';
import { SpawnPosition } from '../pokemons/PokemonEnums';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Team from './Team';

export default class PlayerTeam extends Team {
  moneyEl = document.getElementById('player-money');
  pokemonEl = document.getElementById('player-pokemon');

  setup(mapData: { spawn: SpawnPosition, boss: SpawnPosition }) {
    super.setup(mapData);
    // Update our displayed values
    this.updateMoney(0);
    this.updatePokemon();
  }

  updateMoney(amount: number) {
    super.updateMoney(amount);
    this.moneyEl.innerText = `Money: $${this.money}`;
  }

  updatePokemon() {
    this.pokemonEl.innerText = `Pokemon: ${this.pokemon.size}/50`;
  }

  addPokemon(name: PokemonNameType): void {
    super.addPokemon(name);
    this.updatePokemon();
  }

  draw(delta: number) {
    super.draw(delta);
    if (this.parent.status === GameStatus.started) {
      // Check if enemy boss is dead (victory)
      if (this.parent.enemy.boss?.stats?.hitpoints <= 0) {
        const endGameModal = document.getElementById('endGame');
        endGameModal.querySelector('.victory-text').classList.toggle('d-none', false);
        endGameModal.querySelector('.defeat-text').classList.toggle('d-none', true);
        new Modal(endGameModal).show();
        this.parent.status = GameStatus.ended;
      }
      // Check if our boss is dead (defeat)
      if (this.boss?.stats?.hitpoints <= 0) {
        const endGameModal = document.getElementById('endGame');
        endGameModal.querySelector('.victory-text').classList.toggle('d-none', true);
        endGameModal.querySelector('.defeat-text').classList.toggle('d-none', false);
        new Modal(endGameModal).show();
        this.parent.status = GameStatus.ended;
      }
    }
  }
}
