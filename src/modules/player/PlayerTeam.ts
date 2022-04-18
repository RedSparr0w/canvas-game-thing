import Team from './Team';

export default class PlayerTeam extends Team {
  updateMoney(amount: number) {
    super.updateMoney(amount);
    this.moneyEl.innerText = `Money: $${this.money}`;
  }
}
