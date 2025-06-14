import type { Effect } from '../Effect';
import { ato } from './ato';
import { patoCreateFlashGenerator } from '../funcs/patoCreateFlashGenerator';
import { createTimeGenerator } from '../funcs/createTimeGenerator';

export const sakiChikaBlink: Effect = (props) => {
  const { setPatoLit } = props;
  const base = ato(props);

  const patoFlashGen = (function*() {
    for (let i = 0; i < 2; i++) {
      yield* patoCreateFlashGenerator(setPatoLit, 0.1);
      yield* createTimeGenerator(0.05);
    }
  })();

  return {
    ...base,
    update: (props) => {
      patoFlashGen.next();
      base.update?.(props);
    }
  };
};
