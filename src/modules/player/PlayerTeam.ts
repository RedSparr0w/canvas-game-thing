import { Modal } from 'bootstrap';
import { GameStatus } from '../GameConstants';
import { availablePokemonTemplate, gameControls } from '../menu/items/gameControls';
import { SpawnPosition } from '../pokemons/PokemonEnums';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Team from './Team';

export default class PlayerTeam extends Team {
  moneyEl = document.getElementById('player-money');
  pokemonEl = document.getElementById('player-pokemon');
  availablePokemonEl = document.getElementById('available-pokemon');
  availablePokemon: Set<PokemonNameType> = new Set(['Squirtle', 'Charmander', 'Bulbasaur', 'Pikachu']);

  setup(mapData: { spawn: SpawnPosition, boss: SpawnPosition }) {
    super.setup(mapData);
    // Update our displayed values
    this.updateMoney(0);
    this.updatePokemon();
    this.setupAvailablePokemon();
  }

  setupAvailablePokemon() {
    // Clear our available pokemon list
    this.availablePokemonEl.innerHTML = '';
    this.availablePokemon.forEach((pokemonName: PokemonNameType) => {
      const pokemon = pokemonMap[pokemonName];
      // Clone the new row and insert it into the table
      const clone = availablePokemonTemplate.content.cloneNode(true) as HTMLElement;
      const img = clone.querySelector('img') as HTMLImageElement;
      const title = clone.querySelector('.card-title') as HTMLTitleElement;
      const cost = clone.querySelector('.cost') as HTMLTitleElement;
      const level = clone.querySelector('.level') as HTMLTitleElement;
      const spawnButton = clone.querySelector('.spawn') as HTMLAnchorElement;
      const levelButton = clone.querySelector('.level-up') as HTMLAnchorElement;

      // Update elements with our values
      img.src = `assets/images/pokemonIcons/${pokemon.id.toString().padStart(3, '0')}.png`;
      title.innerText = pokemon.name;
      cost.innerText = `$${this.getPokemonCost(pokemonName)}`;
      level.innerText = `Level ${this.getPokemonLevel(pokemonName)}`;
      spawnButton.dataset.spawn = pokemon.name;
      levelButton.dataset.spawn = pokemon.name;

      // Add our elements to the page
      this.availablePokemonEl.appendChild(clone);

      gameControls.addEventsToElement(spawnButton, {
        click: () => {
          this.addPokemon(pokemonName as PokemonNameType);
        },
      });

      gameControls.addEventsToElement(levelButton, {
        click: () => {
          const success: boolean = this.addPokemonLevel(pokemonName as PokemonNameType);
          if (success) {
            cost.innerText = `$${this.getPokemonCost(pokemonName)}`;
            level.innerText = `Level ${this.getPokemonLevel(pokemonName as PokemonNameType)}`;
          }
        },
      });
    });
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
        this.win();
      }
      // Check if our boss is dead (defeat)
      if (this.boss?.stats?.hitpoints <= 0) {
        this.lose();
      }
    }
  }

  win() {
    const endGameModal = document.getElementById('endGame');
    endGameModal.querySelector('.victory-text').classList.toggle('d-none', false);
    endGameModal.querySelector('.defeat-text').classList.toggle('d-none', true);
    new Modal(endGameModal).show();
    this.parent.status = GameStatus.ended;
  }

  lose() {
    const endGameModal = document.getElementById('endGame');
    endGameModal.querySelector('.victory-text').classList.toggle('d-none', true);
    endGameModal.querySelector('.defeat-text').classList.toggle('d-none', false);
    new Modal(endGameModal).show();
    this.parent.status = GameStatus.ended;
  }
}
