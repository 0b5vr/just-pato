interface CallbackProps {
  time: number;
  delta: number;
  progress: number;
  finished: boolean;
};

export function* createTimeGenerator(
  sec: number,
  callback?: (data: CallbackProps) => void,
) {
  const begin = performance.now() / 1000.0;
  let prev = 0.0;

  while (true) {
    const now = performance.now() / 1000.0;
    let time = now - begin;
    let delta = time - prev;
    let progress = time / sec;
    let finished = false;

    if (time >= sec) {
      time = sec;
      delta = time - prev;
      progress = 1.0;
      finished = true;
    }

    callback?.({
      time,
      delta,
      progress,
      finished,
    });

    if (finished) {
      break;
    }

    prev = now;

    yield;
  }
}
