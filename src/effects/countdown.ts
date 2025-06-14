import type { Effect } from '../Effect';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds';
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';
import { createTimeGenerator } from '../funcs/createTimeGenerator';

const DELAY = 3.0;

export const countdown: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  playSample('stop');
  setButtonState('red-pressed');

  const segGen = (function*() {
    yield* createTimeGenerator(DELAY, ({ time }) => {
      let bits = segsGetBitsByNumber(~~(100.0 * (DELAY - time)), true);
      bits += 0x01 << 16;
      setSegsBits(bits);
    });

    for (let i = 0; i < 6; i++) {
      setSegsBits(0);
      yield* createTimeGenerator(0.1);

      let bits = segsGetBitsByNumber(0, true);
      bits += 0x01 << 16;
      setSegsBits(bits);
      yield* createTimeGenerator(0.2);
    }
    setSegsBits(segsGetBitsByNumber(streak));
  })();

  const patoRotateGen = (function*() {
    yield* createTimeGenerator(DELAY);
    yield* patoCreateRotateGenerator(setPatoRotate, 2, 0.25);
  })();

  const patoFlashGen = (function*() {
    yield* createTimeGenerator(DELAY);
    playSample('kyuin');
    yield* patoCreateFlashGenerator(setPatoLit, 0.5);
  })();

  return {
    update: () => {
      segGen.next();
      patoRotateGen.next();
      patoFlashGen.next();
    },
    release: () => {
      playSample('click');
      setButtonState('blue');
    },
    reset: () => {
      setPatoRotate(0);
      setPatoLit(0);
      stopAllSamples();
      setSegsBits(segsGetBitsByNumber(streak));
    }
  };
};
