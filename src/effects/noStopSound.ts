import type { Effect } from '../Effect';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds';
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';

export const noStopSound: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  setButtonState('red-pressed');

  let patoRotateGen: Generator | undefined;
  let patoFlashGen: Generator | undefined;

  return {
    update: () => {
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
