import type { Effect } from '../Effect';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds';
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';
import { createTimeGenerator } from '../funcs/createTimeGenerator';

const DELAY = 0.3;

export const sakiOkure: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  playSample('stop');
  setButtonState('red-pressed');

  const patoRotateGen = (function*() {
    yield* createTimeGenerator(DELAY);
    yield* patoCreateRotateGenerator(setPatoRotate, 2, 0.25);
  })();

  const patoFlashGen = (function*() {
    yield* createTimeGenerator(DELAY);
    playSample('kyuin');
    setSegsBits(segsGetBitsByNumber(streak));
    yield* patoCreateFlashGenerator(setPatoLit, 0.5);
  })();

  return {
    update: () => {
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
