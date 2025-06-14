import type { Effect } from '../Effect';
import { ato } from './ato';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';

export const sakiChika: Effect = (props) => {
  const { setPatoLit } = props;
  const base = ato(props);

  const patoFlashGen = patoCreateFlashGenerator(setPatoLit, 0.15);

  let pressed = true;

  return {
    ...base,
    update: (props) => {
      if (pressed) {
        patoFlashGen.next();
      }

      base.update?.(props);
    },
    release: () => {
      pressed = false;
      base.release?.();
    },
  };
};
