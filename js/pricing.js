// js/pricing.js

const GEARS = [
  { gear: 62, value: 196.85 },
  { gear: 65, value: 206.375 },
  { gear: 70, value: 222.25 },
  { gear: 75, value: 238.125 },
  { gear: 78, value: 247.65 },
  { gear: 81, value: 257.175 },
  { gear: 84, value: 266.7 },
  { gear: 88, value: 279.4 },
  { gear: 92, value: 292.1 },
  { gear: 95, value: 301.625 },
  { gear: 97, value: 307.975 },
  { gear: 100, value: 317.5 },
  { gear: 103, value: 327.025 },
  { gear: 105, value: 333.375 },
  { gear: 110, value: 349.25 },
  { gear: 115, value: 365.125 }
];

export function findBestGear(labelLength, countInStretch) {
  const target = (labelLength + 3) * countInStretch;

  let best = GEARS[0];
  let minDiff = Math.abs(target - best.value);

  for (let g of GEARS) {
    const diff = Math.abs(target - g.value);
    if (diff < minDiff) {
      minDiff = diff;
      best = g;
    }
  }

  return best;
}

export function calculateGap(gear, countInStretch, labelLength) {
  const total = gear * 3.175;
  return (total / countInStretch) - labelLength;
}

export function calculateMaterialWidth(labelHeight, countInWidth) {
  return ((labelHeight + 3) * countInWidth) / 10 + 1;
}

export function calculateLabelCount(
  gear,
  materialWidth,
  countInStretch,
  countInWidth
) {
  const formula = gear * materialWidth * 3.175;
  return ((10000 * countInStretch * countInWidth) / formula) * 10;
}
