export function* patoCreateRotateGenerator(
  setPatoRotate: (rotate: number) => void,
  count: number,
  duration: number,
) {
  const begin = performance.now() / 1000.0;
  const until = begin + count * duration;

  let now = begin;
  while (now < until) {
    setPatoRotate((now - begin) / duration);
    yield;

    now = performance.now() / 1000.0;
  }

  setPatoRotate(0.0);
}
