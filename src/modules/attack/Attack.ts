import { PokemonType, SpawnPosition } from '../pokemons/PokemonEnums';
import { loadImage } from '../utilities/Functions';
import { AttackStyle } from './AttackEnums';
import AttackSprite from './AttackSprite';

export default class Attack {
  image: HTMLImageElement;

  constructor(
    public name: string,
    public style: AttackStyle,
    public type: PokemonType,
    public power: number,
    public duration: number,
    public frames: number,
    public speed?: number,
    public distance?: number
  ) {
    this.speed = speed || duration;
    this.distance = distance || 0;
  }

  async load() {
    this.image = await loadImage(`assets/images/attacks/${this.name}.png`);
  }

  use(pos: SpawnPosition) {
    MyApp.game.attacks.add(new AttackSprite(this, pos));
  }
}
