import { createTimeGenerator } from './createTimeGenerator';

export function* patoCreateFlashGenerator(
  setPatoLit: (lit: number) => void,
  duration: number,
) {
  setPatoLit(1.0);
  yield* createTimeGenerator(duration - 0.05);
  setPatoLit(0.0);
}
