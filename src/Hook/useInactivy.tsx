import { useEffect, useState } from 'react';

export default function useInactivy() {
  const [inactivy] = useState(60);
  const [activy, setActivy] = useState(0);
  const [isVideoPlay, setIsVideoPlay] = useState(false);

  function checkTime() {
    if (activy >= inactivy) {
      setIsVideoPlay(true);
      setActivy(0);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActivy(activy + 1);
      checkTime();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [inactivy, activy]);

  useEffect(() => {
    window.onclick = () => {
      setActivy(0);
      setIsVideoPlay(false);
    };
  }, []);

  return { isVideoPlay, setIsVideoPlay };
}
