import type { Effect } from '../Effect';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds';
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';
import { createTimeGenerator } from '../funcs/createTimeGenerator';

export const okure: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  setButtonState('red-pressed');

  const okureGen = (function*() {
    yield* createTimeGenerator(0.1);
    playSample('stop');
  })();

  let patoRotateGen: Generator | undefined;
  let patoFlashGen: Generator | undefined;

  return {
    update: () => {
      okureGen.next();
      patoRotateGen?.next();
      patoFlashGen?.next();
    },
    release: () => {
      playSample('kyuin');
      patoRotateGen = patoCreateRotateGenerator(setPatoRotate, 2, 0.25);
      patoFlashGen = patoCreateFlashGenerator(setPatoLit, 0.5);
      setSegsBits(segsGetBitsByNumber(streak));
      setButtonState('blue');
    },
    reset: () => {
      setPatoRotate(0);
      setPatoLit(0);
      stopAllSamples();
    }
  };
};
