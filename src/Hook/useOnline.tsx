import { useEffect, useState } from 'react';

export default function useOnline() {
  const [open, setOpen] = useState(!navigator.onLine);

  const isOnline = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    navigator.onLine ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    const myInterval2 = setInterval( () => isOnline(), 1000 * 60 * 5);
    myInterval2
    return () => {
      clearInterval(myInterval2);
    }
  }, []);

  return { open, setOpen };
}
