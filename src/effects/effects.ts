import type { Effect } from '../Effect';
import { ato } from './ato';
import { bigPato, smallPato, widePato, reversePato, tiltPato } from './bigPato';
import { bigSegs, smallSegs, reverseSegs } from './bigSegs';
import { countdown } from './countdown';
import { lose } from './lose';
import { noStopSound } from './noStopSound';
import { okure } from './okure';
import { okurePato } from './okurePato';
import { saki } from './saki';
import { sakiChika } from './sakiChika';
import { sakiChikaBlink } from './sakiChikaBlink';
import { sakiChikaHold } from './sakiChikaHold';
import { sakiChikaRotate } from './sakiChikaRotate';
import { sakiOkure } from './sakiOkure';
import { sakiRotate } from './sakiRotate';
import { segsEmpty, segsFull, segsDot, segsBlink, segsGlitch, segsSevens, segsBingo } from './segsGlitch';

export const effects: Record<string, Effect> = {
  'ato': ato,
  'bigPato': bigPato,
  'smallPato': smallPato,
  'widePato': widePato,
  'reversePato': reversePato,
  'tiltPato': tiltPato,
  'bigSegs': bigSegs,
  'smallSegs': smallSegs,
  'reverseSegs': reverseSegs,
  'countdown': countdown,
  'lose': lose,
  'noStopSound': noStopSound,
  'okure': okure,
  'okurePato': okurePato,
  'saki': saki,
  'sakiChika': sakiChika,
  'sakiChikaBlink': sakiChikaBlink,
  'sakiChikaHold': sakiChikaHold,
  'sakiChikaRotate': sakiChikaRotate,
  'sakiOkure': sakiOkure,
  'sakiRotate': sakiRotate,
  'segsEmpty': segsEmpty,
  'segsFull': segsFull,
  'segsDot': segsDot,
  'segsBlink': segsBlink,
  'segsGlitch': segsGlitch,
  'segsSevens': segsSevens,
  'segsBingo': segsBingo,
};
