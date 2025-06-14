import type { Effect } from '../Effect';
import { ato } from './ato';

function createEffect(transform: string): Effect {
  return (props) => {
    const { setSegsTransform, setSegsZIndex } = props;
    const base = ato(props);

    setSegsTransform(transform);
    setSegsZIndex(1);

    return {
      ...base,
      release: () => {
        setSegsTransform('');
        setSegsZIndex(0);
        base.release?.();
      },
    };
  }
}

export const bigSegs = createEffect('scale(2.0)');
export const smallSegs = createEffect('scale(0.5)');
export const reverseSegs = createEffect('scale(-1.0, -1.0)');
