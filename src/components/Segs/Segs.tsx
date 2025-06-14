import { useEffect, useRef } from 'react';
import segSvg from './assets/7seg.svg?no-inline';

function updateSegs(svg: Document, bits: number) {
  ['dp', 'g', 'f', 'e', 'd', 'c', 'b', 'a'].forEach((id, i) => {
    const seg = svg.getElementById(id) as SVGElement | null;
    const x = (bits & (1 << i)) !== 0;

    if (seg) {
      seg.style.display = x ? 'inline' : 'none';
    }
  });
}

function Segs1({ bits }: {
  bits: number;
}) {
  const refObject = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    const obj = refObject.current;
    const svg = obj?.contentDocument;

    if (!svg) {
      return;
    }

    updateSegs(svg, bits);

    obj.addEventListener('load', () => {
      const svgDoc = obj.contentDocument;
      if (svgDoc) {
        updateSegs(svgDoc, bits);
      }
    });
  }, [bits]);

  return (
    <object
      ref={refObject}
      type="image/svg+xml"
      data={segSvg}
      className="w-[56px] h-[64px] scale-[1.142]"
    />
  );
}

export function Segs({ bits, transform, zIndex }: {
  bits: number;
  transform: string;
  zIndex: number;
}) {
  return (
    <div
      className="flex px-[16px] py-[8px] bg-[#240000] shadow-inner select-none"
      style={{ transform, zIndex }}
    >
      <Segs1 bits={(bits >> 16) & 255} />
      <Segs1 bits={(bits >> 8) & 255} />
      <Segs1 bits={bits & 255} />
    </div>
  );
}
