// TIME VALUES
export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

// TICKS
export const SAVE_TICK = 10 * SECOND;

// SPRITES
export const MAP_TILE_SIZE = 48;
export const POKEMON_TILE_SIZE = 64;
export const CURSOR_TILE_SIZE = 32;

// ROAMERS
export const ROAMING_MIN_CHANCE = 8192;
export const ROAMING_MAX_CHANCE = 4096;

// SHINY
export const SHINY_CHANCE = 8192;

// GAMEPLAY
export const MONEY_TICK = 1 * SECOND;
export const MONEY_PER_TICK = 10;

/*
FUNCTIONS
*/
export function cleanHTMLString(str: string): string {
  return str.replace(/([|&;$%@"<>()+,])/g, (c: string) => `&#${c.charCodeAt(0)};`);
}

export function humanifyString(str: string): string {
  return str.replace(/[_-]+/g, ' ');
}

export function camelCaseToString(str: string): string {
  return str.replace(/[\s_-]?([A-Z])/g, ' $1').replace(/\b\w/g, (w) => (w.replace(/\w/, (c) => c.toUpperCase()))).trim();
}

export function formatDate(date: Date): string {
  return date.toISOString().replace(/T/, ' ').replace(/.\d+Z/, '');
}

export function formatTime(input: number | Date): string {
  if (input === 0) { return 'Ready'; }

  const time = parseInt(`${input}`, 10); // don't forget the second param
  const hours: any = `${Math.floor(time / 3600)}`.padStart(2, '0');
  const minutes: any = `${Math.floor((time - (hours * 3600)) / 60)}`.padStart(2, '0');
  const seconds: any = `${time - (hours * 3600) - (minutes * 60)}`.padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function formatTimeFullLetters(input: number): string {
  // Temporarily recast to number until everything is in modules
  if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
  let time = Math.abs(input * 1000);
  const times = [];

  if (time >= WEEK) {
    const weeks = Math.floor(time / WEEK);
    times.push(`${weeks}w`.padStart(3, '0'));
    time %= WEEK;
  }
  if (time >= DAY || times.length) {
    const days = Math.floor(time / DAY);
    times.push(`${days}d`.padStart(3, '0'));
    time %= DAY;
  }
  if (time >= HOUR || times.length) {
    const hours = Math.floor(time / HOUR);
    times.push(`${hours}h`.padStart(3, '0'));
    time %= HOUR;
  }
  if (time >= MINUTE || times.length) {
    const minutes = Math.floor(time / MINUTE);
    times.push(`${minutes}m`.padStart(3, '0'));
    time %= MINUTE;
  }
  if (time >= SECOND || times.length) {
    const seconds = Math.floor(time / SECOND);
    times.push(`${seconds}s`.padStart(3, '0'));
  }
  return times.slice(0, 3).join(' ');
}

export function formatTimeShortWords(input: number): string {
  // Temporarily recast to number until everything is in modules
  if (Number.isNaN(Number(input)) || input === 0) { return 'now'; }
  const time = Math.abs(input);

  if (time > DAY) {
    const days = Math.ceil(time / DAY);
    return `${time % DAY ? '< ' : ''}${days} day${days === 1 ? '' : 's'}`;
  }
  if (time > HOUR) {
    const hours = Math.ceil(time / HOUR);
    return `${time % HOUR ? '< ' : ''}${hours} hour${hours === 1 ? '' : 's'}`;
  }
  const minutes = Math.ceil(time / MINUTE);
  return `${time % MINUTE ? '< ' : ''}${minutes} min${minutes === 1 ? '' : 's'}`;
}

export function formatSecondsToTime(input: number): string {
  // Temporarily recast to number until everything is in modules
  if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
  let time = Math.abs(input * 1000);
  const times = [];

  if (time >= WEEK) {
    const weeks = Math.floor(time / WEEK);
    times.push(`${weeks} week${weeks === 1 ? '' : 's'}`);
    time %= WEEK;
  }
  if (time >= DAY) {
    const days = Math.floor(time / DAY);
    times.push(`${days} day${days === 1 ? '' : 's'}`);
    time %= DAY;
  }
  if (time >= HOUR) {
    const hours = Math.floor(time / HOUR);
    times.push(`${hours} hour${hours === 1 ? '' : 's'}`);
    time %= HOUR;
  }
  if (time >= MINUTE) {
    const minutes = Math.floor(time / MINUTE);
    times.push(`${minutes} min${minutes === 1 ? '' : 's'}`);
    time %= MINUTE;
  }
  if (time >= SECOND) {
    const seconds = Math.floor(time / SECOND);
    times.push(`${seconds} sec${seconds === 1 ? '' : 's'}`);
  }
  return times.join('</br>');
}

export function formatNumber(input: number): string {
  let num = Number(input);
  if (Number.isNaN(+num)) { return '0'; }

  if (num >= 1e12) {
    num = Math.floor(num / 1e11);
    num = num < 100 ? num / 10 : Math.floor(num / 10);
    return `${num}T`;
  }

  if (num >= 1e9) {
    num = Math.floor(num / 1e8);
    num = num < 100 ? num / 10 : Math.floor(num / 10);
    return `${num}B`;
  }

  if (num >= 1e6) {
    num = Math.floor(num / 1e5);
    num = num < 100 ? num / 10 : Math.floor(num / 10);
    return `${num}M`;
  }

  if (num >= 1e3) {
    num = Math.floor(num / 1e2);
    num = num < 100 ? num / 10 : Math.floor(num / 10);
    return `${num}K`;
  }

  return num.toString();
}

export const TypeColor = [
  '#A8A77A', // Normal
  '#EE8130', // Fire
  '#6390F0', // Water
  '#F7D02C', // Electric
  '#7AC74C', // Grass
  '#96D9D6', // Ice
  '#C22E28', // Fighting
  '#A33EA1', // Poison
  '#E2BF65', // Ground
  '#A98FF3', // Flying
  '#F95587', // Psychic
  '#A6B91A', // Bug
  '#B6A136', // Rock
  '#735797', // Ghost
  '#6F35FC', // Dragon
  '#705746', // Dark
  '#B7B7CE', // Steel
  '#D685AD', // Fairy
];

export enum Starter {
  'None' = -1,
  'Bulbasaur' = 0,
  'Charmander' = 1,
  'Squirtle' = 2,
  'Pikachu' = 3,
}

export const KeyCodeToDirection = {
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowDown: 'down',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyA: 'left',
  KeyS: 'down',
  KeyD: 'right',
};

export enum GameStatus {
  stopped,
  started,
  paused,
  ended,
}
