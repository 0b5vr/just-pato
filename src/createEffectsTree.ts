import type { EffectsTree } from './EffectsTree';

export function createEffectsTree(props: {
  sakiRatio: number;
  iwakanRatio: number;
}): EffectsTree {
  const { sakiRatio, iwakanRatio } = props;

  return [
    [sakiRatio, [ // 先告知系
      [1.0 - iwakanRatio, "saki"],
      [iwakanRatio, [ // 違和感
        [3, "sakiOkure"],
        [1, "countdown"],
      ]],
    ]],
    [1.0 - sakiRatio, [ // 後告知系
      [1.0 - iwakanRatio, "ato"],
      [iwakanRatio, [ // 違和感
        [2, "okurePato"],
        [4, [ // 先チカ系
          [4, "sakiChika"],
          [4, "sakiChikaBlink"],
          [1, "sakiChikaHold"],
          [4, "sakiChikaRotate"],
          [1, "sakiRotate"],
        ]],
        [4, "noStopSound"],
        [4, "okure"],
        [1, [ // パト違和感
          [4, "smallPato"],
          [4, "bigPato"],
          [2, "widePato"],
          [2, "reversePato"],
          [1, "tiltPato"],
        ]],
        [1, [ // セグ位置違和感
          [5, "bigSegs"],
          [2, "smallSegs"],
          [1, "reverseSegs"],
        ]],
        [4, [ // セグ表示違和感
          [8, "segsEmpty"],
          [2, "segsFull"],
          [8, "segsDot"],
          [8, "segsBlink"],
          [1, "segsGlitch"],
          [1, "segsSevens"],
          [1, "segsBingo"],
        ]],
      ]],
    ]],
  ];
}
