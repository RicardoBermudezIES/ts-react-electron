import React from 'react';
import useInactivy from '../../Hook/useInactivy';
import useListVideos from '../../Hook/useListVideos';
import Alert from '../Alert/Alert';
import Carousel from '../Carousel/Carousel';


export default function Promocional() {
  const { isVideoPlay, setIsVideoPlay } = useInactivy();
  const { listPromocional, error, URL_BASE, OnClickHiddenVideo } = useListVideos(
    setIsVideoPlay,
    isVideoPlay,
  );

  return (
    <section onClick={OnClickHiddenVideo} className={`${isVideoPlay ? '' : 'hidden'} `}>
      {
        listPromocional !== undefined ?
          <Carousel carouselItems={listPromocional} URL_BASE={URL_BASE} />
          : <Alert
          open={error}
          onClose={() => false }
          message={error}
        />
      }

    </section>
  );
}
