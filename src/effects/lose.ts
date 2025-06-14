import { playSample, stopAllSamples } from '../sounds/sounds.js';
import type { Effect } from '../Effect.js';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber.js';

export const lose: Effect = (props) => {
  const { streak, setSegsBits, setButtonState } = props;

  playSample('stop');
  setButtonState('red-pressed');

  return {
    release: () => {
      playSample('click');
      setSegsBits(segsGetBitsByNumber(streak));
      setButtonState('blue');
    },
    reset: () => {
      stopAllSamples();
    },
  };
}
