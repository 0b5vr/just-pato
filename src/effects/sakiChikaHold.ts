import type { Effect } from '../Effect';
import { ato } from './ato';

export const sakiChikaHold: Effect = (props) => {
  const { setPatoLit } = props;
  const base = ato(props);

  setPatoLit(1.0);

  return base;
};
