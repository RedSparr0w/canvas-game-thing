import { context } from '../Canvas';

export default class CanvasTinyNumber {
  static width = 3;
  static height = 5;
  static draw(number: number | string, x: number, y: number): void {
    number.toString().split('').forEach((num: string, index: number) => {
      context.drawImage(MyApp.images.list.tiny_numbers, (+num) * this.width, 0, this.width, this.height, x + ((index * this.width) + index), y, this.width, this.height);
    });
  }
}
