import { useCallback, useState } from 'react';
import { resumeAudio } from '../sounds/sounds';

export function PlayOverlay() {
  const [isActive, setActive] = useState(true);

  const handleClick = useCallback(() => {
    resumeAudio();
    setActive(false);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/90 text-white cursor-pointer"
      onClick={handleClick}
    >
      このページは音が鳴ります。<br />
      クリックすると開始します。
    </div>
  );
}
