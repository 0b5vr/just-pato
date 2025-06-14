import { lerp } from '@0b5vr/experimental';
import type { Effect } from '../Effect';
import { ato } from './ato';
import { createTimeGenerator } from '../funcs/createTimeGenerator';

function createEffect(scaler: (x: number) => string): Effect {
  return (props) => {
    const { setPatoTransform, setPatoZIndex } = props;
    const base = ato(props);

    setPatoTransform(scaler(1.0));
    setPatoZIndex(1);

    let revertGen: Generator | null = null;

    return {
      update: (props) => {
        revertGen?.next();
        base.update?.(props);
      },
      release: () => {
        revertGen = (function*() {
          yield* createTimeGenerator(0.8);
          yield* createTimeGenerator(0.25, ({ progress }) => {
            setPatoTransform(scaler(1.0 - progress));
          });
        })();

        base.release?.();
      },
      reset: () => {
        revertGen = null;
        setPatoTransform(scaler(0.0));
        setPatoZIndex(0);
        base.reset?.();
      },
    };
  };
}

export const bigPato = createEffect((x) => `scale(${lerp(1.0, 2.0, x)})`);
export const smallPato = createEffect((x) => `scale(${lerp(1.0, 0.5, x)})`);
export const widePato = createEffect((x) => `scale(${lerp(1.0, 2.0, x)}, 1.0)`);
export const reversePato = createEffect((x) => `scale(1.0, ${lerp(1.0, -1.0, x)})`);
export const tiltPato = createEffect((x) => `rotate(${5.0 * x}deg)`);
