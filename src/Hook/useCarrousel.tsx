import { useEffect, useState } from 'react';

export default function useCarrousel(carouselItems: string[]) {
  const [active, setActive] = useState(0);
  let scrollInterval: NodeJS.Timeout;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    scrollInterval = setTimeout(() => {
      if (active >= carouselItems.length - 1) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, 1000 * 10);
    return () => clearTimeout(scrollInterval);
  }, [active]);

  return { active };
}
