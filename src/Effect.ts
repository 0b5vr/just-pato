export interface EffectProps {
  streak: number;
  setPatoRotate: (rotate: number) => void;
  setPatoLit: (lit: number) => void;
  setPatoTransform: (transform: string) => void;
  setPatoZIndex: (zIndex: number) => void;
  setSegsBits: (bits: number) => void;
  setSegsTransform: (transform: string) => void;
  setSegsZIndex: (zIndex: number) => void;
  setButtonState: (state: 'blue' | 'red' | 'red-pressed') => void;
};

export interface EffectHandlers {
  update?: (props: { delta: number }) => void;
  release?: () => void;
  reset?: () => void;
}

export type Effect = (props: EffectProps) => EffectHandlers;
