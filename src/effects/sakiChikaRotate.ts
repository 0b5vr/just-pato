import type { Effect } from '../Effect'
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import { playSample, stopAllSamples } from '../sounds/sounds'
import { patoCreateRotateGenerator } from '../funcs/patoCreateRotateGenerator';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';

export const sakiChikaRotate: Effect = (props) => {
  const { streak, setPatoRotate, setPatoLit, setSegsBits, setButtonState } = props;

  playSample('stop');
  setButtonState('red-pressed');

  let patoRotateGen = patoCreateRotateGenerator(setPatoRotate, 1, 0.25);
  let patoFlashGen = patoCreateFlashGenerator(setPatoLit, 0.15);

  return {
    update: () => {
      patoRotateGen.next();
      patoFlashGen.next();
    },
    release: () => {
      playSample('kyuin');
      setButtonState('blue');

      const patoRotateGenPrev = patoRotateGen;
      patoRotateGen = (function*() {
        yield* patoRotateGenPrev;
        yield* patoCreateRotateGenerator(setPatoRotate, 2, 0.25);
      })();
      patoFlashGen = patoCreateFlashGenerator(setPatoLit, 0.5);
      setSegsBits(segsGetBitsByNumber(streak));
    },
    reset: () => {
      setPatoRotate(0.0);
      setPatoLit(0.0);
      stopAllSamples();
    }
  }
}
