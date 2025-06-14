import clsx from 'clsx';
import { type EffectMode } from './App';

interface Props {
  mode: EffectMode;
  onChangeMode: (mode: EffectMode) => void;
  className?: string;
}

const modeText: Record<EffectMode, string> = {
  normal: 'ノーマルモード',
  simple: 'シンプルモード',
  saki: '先告知モード',
  iwakan: '違和感モード',
};

const modes: EffectMode[] = ['normal', 'simple', 'saki', 'iwakan'];

export function ModeSelector({ mode, className, onChangeMode }: Props) {
  const handlePrevMode = () => {
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex - 1 + modes.length) % modes.length;
    onChangeMode(modes[nextIndex]);
  };

  const handleNextMode = () => {
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    onChangeMode(modes[nextIndex]);
  };

  return (
    <div className={clsx(
      "flex justify-center items-center gap-2 text-gray-500 text-sm",
      className
    )}>
      <button
        onClick={handlePrevMode}
        className="cursor-pointer select-none"
      >
        {'<'}
      </button>
      <div className="w-[128px] text-center">
        {modeText[mode]}
      </div>
      <button
        onClick={handleNextMode}
        className="cursor-pointer select-none"
      >
        {'>'}
      </button>
    </div>
  );
}
