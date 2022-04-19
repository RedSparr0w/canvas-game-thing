import { canvas, context } from '../Canvas';
import { MAP_TILE_SIZE } from '../GameConstants';
import { SpawnPosition } from '../pokemons/PokemonEnums';
import { tileToCanvas } from '../utilities/CanvasFunctions';
import type Attack from './Attack';

export default class AttackSprite {
  frame = 0;

  constructor(
    public attack: Attack,
    public pos: SpawnPosition
  ) {}

  draw(delta: number) {
    this.frame += delta;
    // If this attack is over, remove it
    if (this.frame >= this.attack.duration) {
      MyApp.game.attacks.delete(this);
      return;
    }
    // context.save();
    // context.translate(canvas.width, 0);
    // context.scale(-1, 1);
    const { x, y } = tileToCanvas(this.pos.x, this.pos.y);
    const column = Math.floor(this.frame / (this.attack.speed / this.attack.frames)) % this.attack.frames;
    const row = 0;
    context.drawImage(this.attack.image, column * this.attack.image.height, row, this.attack.image.width / this.attack.frames, this.attack.image.height, x, y, MAP_TILE_SIZE, MAP_TILE_SIZE);
    // context.restore();
  }
}
