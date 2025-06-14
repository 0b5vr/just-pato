const segsBitsByNumber = [
  0xfc,
  0x60,
  0xda,
  0xf2,
  0x66,
  0xb6,
  0xbe,
  0xe0,
  0xfe,
  0xf6,
];

export function segsGetBitsByNumber(num: number, zeropad: boolean = false): number {
  let bits = segsBitsByNumber[num % 10];
  if (zeropad || num >= 10) {
    bits += segsBitsByNumber[~~(num / 10) % 10] << 8;
  }
  if (zeropad || num >= 100) {
    bits += segsBitsByNumber[~~(num / 100) % 10] << 16;
  }

  return bits;
}
