/* eslint-disable no-bitwise */
import { MINUTE, HOUR } from '../GameConstants';
import { clipNumber } from './Functions';

export default class SeededRand {
  private static state = 12345;

  public static next(): number {
    // mulberry32
    this.state = this.state + 0x6D2B79F5 | 0;
    let t = this.state;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  public static seedWithDate(d: Date): void {
    this.state = Number((d.getFullYear() - 1900) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate());
  }

  // hours specifies how many hours the seed should remain the same
  public static seedWithDateHour(d: Date, hours = 1): void {
    // Adjust date for timezone offset and hours rounded
    const time = d.getTime();
    const offset = -(d.getTimezoneOffset() * (MINUTE));
    const offsetTime = time + offset;
    const newDate = new Date(time - (offsetTime % (HOUR * hours)));
    const newHour = newDate.getHours();
    // Set state based on adjusted date
    this.seedWithDate(newDate);
    // Update state based on current hour
    this.state += 1000000 * newHour;
  }

  public static seed(state: number): void {
    this.state = state;
  }

  // get a number between min and max (both inclusive)
  public static intBetween(min: number, max: number): number {
    return Math.floor((max - min + 1) * this.next() + min);
  }

  // get a floored number from 0 to max (excluding max)
  public static floor(max: number): number {
    return Math.floor(this.next() * max);
  }

  // get a number from 0 to max (excluding max)
  public static float(max: number): number {
    return this.next() * max;
  }

  // 50/50 chance of true or false
  public static boolean(): boolean {
    return !!this.intBetween(0, 1);
  }

  // If number is more than one, the chance is 1/chance otherwise the chance is a percentage
  public static chance(chance: number): boolean {
    return this.next() <= (chance >= 1 ? 1 / chance : chance);
  }

  // Pick an element from an array
  public static fromArray<T>(arr: Array<T>): T {
    return arr[this.intBetween(0, arr.length - 1)];
  }

  // Return a random element from the array, with an exponential distribution
  // The last element has a 1/ratio chance of being chosen, one before last is 1/(ratio^2), etc
  // The logarithm is clipped up to 0, so the first two elements will have equal chance
  public static expFromArray<T>(array: T[], ratio: number): T {
    const r = this.next();
    const logr = Math.log(r) / Math.log(ratio);
    const n = Math.floor(logr + array.length);
    const x = clipNumber(n, 0, array.length - 1);
    return array[x];
  }

  // Pick an element from an array with specified weights
  public static fromWeightedArray<T>(arr: Array<T>, weights: Array<number>): T {
    const max = weights.reduce((acc, weight) => acc + weight, 0);
    let rand = this.next() * max;
    return arr.find((_e, i) => (rand -= weights[i]) <= 0) || arr[0];
  }

  // Filters out any enum values that are less than 0 (for None)
  public static fromEnum(_enum): number {
    const arr = Object.keys(_enum).map(Number).filter((item) => item >= 0);
    return this.fromArray(arr);
  }

  // Get a string of letters and numbers (lowercase)
  public static string(length: number): string {
    return [...Array(length)].map(() => this.next().toString(36)[2]).join('');
  }
}
