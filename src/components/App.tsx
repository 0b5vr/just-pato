import { useCallback, useEffect, useRef, useState } from 'react';
import { Pato } from './Pato/Pato';
import { PlayOverlay } from './PlayOverlay';
import { Segs } from './Segs/Segs';
import { StopButton } from './StopButton/StopButton';
import { segsGetBitsByNumber } from '../funcs/segsGetBitsByNumber';
import type { EffectHandlers } from '../Effect';
import { effects } from '../effects/effects';
import { getEffectIdByFlag } from '../getEffectIdByFlag';
import { createEffectsTree } from '../createEffectsTree';
import { ModeSelector } from './ModeSelector';
import { HelpModal } from './HelpModal';
import { Icon } from '@iconify/react';

function roll() {
  return ~~(Math.random() * 65536);
}

const WIN_FLAGS = 32768;

function isWin(flag: number) {
  return flag < WIN_FLAGS;
}

export type EffectMode = 'normal' | 'simple' | 'saki' | 'iwakan';

const propsByMode: Record<EffectMode, { sakiRatio: number; iwakanRatio: number }> = {
  normal: { sakiRatio: 0.25, iwakanRatio: 0.25 },
  simple: { sakiRatio: 0.0, iwakanRatio: 0.0 },
  saki: { sakiRatio: 0.9, iwakanRatio: 0.0 },
  iwakan: { sakiRatio: 0.0, iwakanRatio: 0.99 },
};

export function App() {
  const refStreak = useRef(0);
  const [mode, setMode] = useState<EffectMode>('normal');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [patoRotate, setPatoRotate] = useState(0);
  const [patoLit, setPatoLit] = useState(0);
  const [patoTransform, setPatoTransform] = useState('');
  const [patoZIndex, setPatoZIndex] = useState(0);
  const [segsBits, setSegsBits] = useState(segsGetBitsByNumber(0));
  const [segsTransform, setSegsTransform] = useState('');
  const [segsZIndex, setSegsZIndex] = useState(0);
  const [buttonState, setButtonState] = useState<'blue' | 'red' | 'red-pressed'>('blue');
  const refEffect = useRef<EffectHandlers | null>(null);

  const handlePress = useCallback(() => {
    refEffect.current?.reset?.();

    const flag = roll();

    let effectId: string;
    if (isWin(flag)) {
      const effectsTree = createEffectsTree(propsByMode[mode]);
      effectId = getEffectIdByFlag(flag, 0, WIN_FLAGS, effectsTree);
      refStreak.current += 1;
    } else {
      effectId = 'lose';
      refStreak.current = 0;
    }

    const effect = effects[effectId];
    if (!effect) {
      throw new Error(`Effect not found: ${effectId}`);
    }

    refEffect.current = effect({
      streak: refStreak.current,
      setPatoRotate,
      setPatoLit,
      setPatoTransform,
      setPatoZIndex,
      setSegsBits,
      setSegsTransform,
      setSegsZIndex,
      setButtonState,
    }) ?? null;
  }, [mode]);

  const handleRelease = useCallback(() => {
    refEffect.current?.release?.();
  }, []);

  const refPrev = useRef(performance.now() / 1000.0);
  useEffect(() => {
    const update = () => {
      const now = performance.now() / 1000.0;
      const delta = now - refPrev.current;
      refPrev.current = now;

      refEffect.current?.update?.({ delta });

      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, []);

  const handleOpenHelp = useCallback(() => {
    setIsHelpOpen(true);
  }, []);

  const handleCloseHelp = useCallback(() => {
    setIsHelpOpen(false);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <Pato rotate={patoRotate} lit={patoLit} transform={patoTransform} zIndex={patoZIndex} />
        <Segs bits={segsBits} transform={segsTransform} zIndex={segsZIndex} />
        <StopButton
          state={buttonState}
          className='mt-[32px]'
          onPress={handlePress}
          onRelease={handleRelease}
        />
      </div>
      <ModeSelector mode={mode} onChangeMode={setMode} className="fixed top-4 w-full" />
      <button
        className="fixed bottom-2 right-2 p-3 text-gray-400 hover:text-gray-500 rounded-full cursor-pointer"
        onClick={handleOpenHelp}
      >
        <Icon icon="mdi:help-circle" className="w-6 h-6" />
      </button>
      <HelpModal isOpen={isHelpOpen} onClose={handleCloseHelp} />
      <PlayOverlay />
    </>
  );
}
