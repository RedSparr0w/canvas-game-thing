import Rand from '../utilities/Rand';
import Team from './Team';

export default class EnemyTeam extends Team {
  spawnFrame = 0;
  spawnFrequency = 1500;

  draw(delta: number) {
    super.draw(delta);

    // Spawn a pokemon in every x ms
    this.spawnFrame += delta;
    if (this.spawnFrame >= this.spawnFrequency) {
      this.spawnFrame -= this.spawnFrequency;
      this.addPokemon(Rand.fromArray(['Rattata', 'Pikachu', 'Pidgey', 'Caterpie', 'Weedle', 'Mankey']));
    }
  }
}
