import litPng from './assets/lit.png';
import unlitPng from './assets/unlit.png';

export function Pato({ rotate, lit, transform, zIndex }: {
  rotate: number;
  lit: number;
  transform: string;
  zIndex: number;
}) {
  const objectPositionLeft = Math.floor(16.0 * (rotate % 1.0)) / 15 * 100;
  const objectPosition = `${objectPositionLeft}% 0%`;

  return (
    <div
      className="relative select-none"
      style={{ transform, zIndex }}
    >
      <img
        src={unlitPng}
        alt="消灯したパトランプのスプライトシート"
        className="w-[256px] aspect-[1] object-cover object-left"
        style={{
          objectPosition,
        }}
      />
      <img
        src={litPng}
        alt="点灯したパトランプのスプライトシート"
        className="absolute top-0 w-[256px] aspect-[1] object-cover object-left opacity-0 transition-opacity duration-[75ms]"
        style={{
          objectPosition,
          opacity: lit ? 1 : 0,
        }}
      />
    </div>
  );
}
