/* eslint-disable array-bracket-newline */
import { PokemonType } from '../pokemons/PokemonEnums';
import SeededRand from '../utilities/SeededRand';
import Attack from './Attack';
import { AttackStyle } from './AttackEnums';

export const Attacks: Record<PokemonType, Record<string, Attack>> = {
  [PokemonType.None]: {},
  [PokemonType.Normal]: {
    Cut: new Attack(
      'Cut',
      AttackStyle.physical,
      PokemonType.Normal,
      50,
      500,
      4
    ),
    Cut2: new Attack(
      'Cut2',
      AttackStyle.physical,
      PokemonType.Normal,
      50,
      600,
      4
    ),
    Pound: new Attack(
      'Pound',
      AttackStyle.physical,
      PokemonType.Normal,
      40,
      700,
      21
    ),
    // {
    //   name: 'pound',
    //   type: AttackStyle.physical,
    //   duration: 700,
    //   cooldown: 950,
    // },
    // {
    //   name: 'swift',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
  },
  [PokemonType.Fire]: {
    // {
    //   name: 'fire-punch',
    //   type: AttackStyle.physical,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'fire-blast',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'fire-fang',
    //   type: AttackStyle.physical,
    //   duration: 600,
    //   cooldown: 850,
    // },
  },
  [PokemonType.Water]: {
    // {
    //   name: 'bubble',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'splash',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'water-gun',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
  },
  [PokemonType.Electric]: {
    // {
    //   name: 'spark',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'thunder-fang',
    //   type: AttackStyle.physical,
    //   duration: 600,
    //   cooldown: 850,
    // },
    // {
    //   name: 'thunder-shock',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
  },
  [PokemonType.Grass]: {
    // {
    //   name: 'seed-bomb',
    //   type: AttackStyle.physical,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'razor-leaf',
    //   type: AttackStyle.physical,
    //   duration: 600,
    //   cooldown: 850,
    // },
  },
  [PokemonType.Ice]: {
    // {
    //   name: 'ice-fang',
    //   type: AttackStyle.physical,
    //   duration: 600,
    //   cooldown: 850,
    // },
  },
  [PokemonType.Fighting]: {
    // {
    //   name: 'punch',
    //   type: AttackStyle.physical,
    //   duration: 500,
    //   cooldown: 750,
    // },
  },
  [PokemonType.Poison]: {
    // {
    //   name: 'smog',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
  },
  [PokemonType.Ground]: {
    // {
    //   name: 'mud-slap',
    //   type: AttackStyle.special,
    //   duration: 500,
    //   cooldown: 750,
    // },
  },
  [PokemonType.Flying]: {
    // {
    //   name: 'gust',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
    // {
    //   name: 'air-cutter',
    //   type: AttackStyle.special,
    //   duration: 750,
    //   cooldown: 1000,
    // },
  },
  [PokemonType.Psychic]: {
    // {
    //   name: 'psycho-cut',
    //   type: AttackStyle.special,
    //   duration: 600,
    //   cooldown: 850,
    // },
  },
  [PokemonType.Bug]: {
    // {
    //   name: 'string-shot',
    //   type: AttackStyle.special,
    //   duration: 500,
    //   cooldown: 750,
    // },
  },
  [PokemonType.Rock]: {
    // {
    //   name: 'rock-throw',
    //   type: AttackStyle.special,
    //   duration: 500,
    //   cooldown: 750,
    // },
  },
  [PokemonType.Ghost]: {
    // {
    //   name: 'shadow-claw',
    //   type: AttackStyle.physical,
    //   duration: 700,
    //   cooldown: 900,
    // },
  },
  [PokemonType.Dragon]: {},
  [PokemonType.Dark]: {
    // {
    //   name: 'bite',
    //   type: AttackStyle.physical,
    //   duration: 500,
    //   cooldown: 750,
    // },
    // {
    //   name: 'dark-pulse',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
    // {
    //   name: 'shadow-force',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
  },
  [PokemonType.Steel]: {},
  [PokemonType.Fairy]: {
    // {
    //   name: 'misty-explosion',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
    // {
    //   name: 'sparkly-swirl',
    //   type: AttackStyle.special,
    //   duration: 1000,
    //   cooldown: 1010,
    // },
    // {
    //   name: 'draining-kiss',
    //   type: AttackStyle.special,
    //   duration: 600,
    //   cooldown: 850,
    // },
  },
};

export const selectAttack = (type: PokemonType, type2: PokemonType, style: AttackStyle, id = 0): Attack => {
  let possibleAttacks: Attack[] = [];

  if (type !== undefined) {
    possibleAttacks.push(...Object.values(Attacks[type]));
  }

  if (type2 !== undefined) {
    possibleAttacks.push(...Object.values(Attacks[type2]));
  }

  possibleAttacks = possibleAttacks.filter((a) => a.style === style);
  if (!possibleAttacks.length) {
    return Attacks[PokemonType.Normal].Cut;
  }

  SeededRand.seed(id);
  const attack = SeededRand.fromArray(possibleAttacks) as Attack;

  return attack;
};
