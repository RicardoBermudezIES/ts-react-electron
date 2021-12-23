import React from 'react';
import useCarrousel from '../../Hook/useCarrousel';

type Props = {
  carouselItems: string[];
  URL_BASE: string;
};

export default function Carousel({ carouselItems, URL_BASE }: Props) {
  const { active } = useCarrousel(carouselItems);
  return (
    <div className="carousel">
      {carouselItems?.map((item, index) => {
        const activeClass = active === index ? 'visible' : '';
        return (
          <img
            key={item}
            className={`carousel-item ${activeClass}`}
            src={`${URL_BASE}/${item}`}
            alt={item}
          />
        );
      })}
    </div>
  );
}
