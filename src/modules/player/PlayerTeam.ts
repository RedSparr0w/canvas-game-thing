import { PokemonDirection } from '../pokemons/PokemonEnums';
import Team from './Team';

export default class PlayerTeam extends Team {
  setup(mapData: { spawn: { x: number, y: number, direction: PokemonDirection }}) {
    super.setup(mapData);
    // Update out displayed money
    this.updateMoney(0);
  }

  updateMoney(amount: number) {
    super.updateMoney(amount);
    this.moneyEl.innerText = `Money: $${this.money}`;
  }
}
