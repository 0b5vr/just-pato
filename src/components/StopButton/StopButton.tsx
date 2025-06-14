import clsx from 'clsx';
import buttonBluePng from './assets/button-blue.png';
import buttonRedPng from './assets/button-red.png';
import buttonRedPressedPng from './assets/button-red-pressed.png';

export function StopButton({ state, onPress, onRelease, className }: {
  state: "blue" | "red" | "red-pressed";
  onPress: () => void;
  onRelease: () => void;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'relative w-[128px] h-[128px] rounded-[64px] flex items-center justify-center cursor-pointer',
        className,
      )}
      onPointerDown={onPress}
      onPointerUp={onRelease}
    >
      <img
        src={buttonBluePng}
        alt="青く点灯したボタン"
        className={clsx(
          'w-full h-full absolute top-0',
          state === 'blue' ? 'block' : 'hidden',
        )}
      />
      <img
        src={buttonRedPng}
        alt="赤く点灯したボタン"
        className={clsx(
          'w-full h-full absolute top-0',
          state === 'red' ? 'block' : 'hidden',
        )}
      />
      <img
        src={buttonRedPressedPng}
        alt="赤く点灯した押されたボタン"
        className={clsx(
          'w-full h-full absolute top-0',
          state === 'red-pressed' ? 'block' : 'hidden',
        )}
      />
    </div>
  );
}
