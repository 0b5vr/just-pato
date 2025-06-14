import type { Effect, EffectProps } from '../Effect';
import { ato } from './ato';
import { createTimeGenerator } from '../funcs/createTimeGenerator';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';

function createEffect(createGen: (props: EffectProps) => Generator): Effect {
  return (props) => {
    const base = ato(props);
    const gen = createGen(props);

    let pressed = true;

    return {
      ...base,
      update: (props) => {
        if (pressed) {
          gen.next();
        }
        base.update?.(props);
      },
      release: () => {
        pressed = false;
        base.release?.();
      },
    };
  }
}

export const segsEmpty = createEffect(({ setSegsBits }) => {
  setSegsBits(0);
  return (function*() { yield; })();
});

export const segsFull = createEffect(({ setSegsBits }) => {
  setSegsBits(0xffffff);
  return (function*() { yield; })();
});

export const segsDot = createEffect(({ setSegsBits, streak }) => {
  setSegsBits(segsGetBitsByNumber(streak - 1) | 1);
  return (function*() { yield; })();
});

export const segsBlink = createEffect(({ setSegsBits, streak }) => (function*() {
  setSegsBits(0);
  yield* createTimeGenerator(0.1);
  setSegsBits(segsGetBitsByNumber(streak - 1));
})());

export const segsGlitch = createEffect(({ setSegsBits }) => (function*() {
  while (true) {
    setSegsBits(~~(Math.random() * 0xffffff));
    yield* createTimeGenerator(1.0 / 10.0);
  }
})());

export const segsSevens = createEffect(({ setSegsBits }) => (function*() {
  const sevens = segsGetBitsByNumber(777);
  while (true) {
    setSegsBits(sevens);
    yield* createTimeGenerator(0.2);
    setSegsBits(0);
    yield* createTimeGenerator(0.1);
  }
})());

export const segsBingo = createEffect(({ setSegsBits }) => (function*() {
  const bitsAnim = [
    0x028002,
    0x020402,
    0x020202,
    0x022002,
    0x021002,
    0x020802,
    0x020202,
    0x024002,
  ];

  for (const bits of bitsAnim) {
    setSegsBits(bits);
    yield* createTimeGenerator(0.05);
  }

  while (true) {
    setSegsBits(0x02e002);
    yield* createTimeGenerator(0.1);
    setSegsBits(0x020002);
    yield* createTimeGenerator(0.1);
  }
})());
