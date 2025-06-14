type EffectsTree = [number, (string | EffectsTree)][];

export function getEffectIdByFlag(
  flag: number,
  min: number,
  max: number,
  tree: EffectsTree,
) {
  const weightTotal = tree.reduce((accum, [weight]) => accum + weight, 0);

  let weightSum = 0.0;
  let currentMin = min;
  let currentMax;

  for (const [weight, idOrSubtree] of tree) {
    weightSum += weight;
    currentMax = Math.floor(min + (max - min) * (weightSum / weightTotal));
    if (flag < currentMax) {
      if (Array.isArray(idOrSubtree)) {
        return getEffectIdByFlag(flag, currentMin, currentMax, idOrSubtree);
      } else {
        return idOrSubtree;
      }
    }

    currentMin = currentMax;
  }

  throw new Error("getEffectIdByFlag: Flag out of range I guess");
}
