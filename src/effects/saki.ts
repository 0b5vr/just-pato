import type { Effect } from '../Effect'
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds'
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';

export const saki: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  playSample('kyuin');
  setButtonState('red-pressed');

  const patoRotateGen = patoCreateRotateGenerator(setPatoRotate, 2, 0.25);
  const patoFlashGen = patoCreateFlashGenerator(setPatoLit, 0.5);
  setSegsBits(segsGetBitsByNumber(streak));

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
      setPatoRotate(0.0);
      setPatoLit(0.0);
      stopAllSamples();
    }
  }
}
