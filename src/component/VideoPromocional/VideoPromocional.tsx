import React, { createRef, RefObject } from 'react';
import useInactivy from '../../Hook/useInactivy';
import useListVideos from '../../Hook/useListVideos';

export default function VideoPromocional() {
  const videoRef: RefObject<HTMLVideoElement> = createRef();
  const { isVideoPlay, setIsVideoPlay } = useInactivy();
  const { numberSong, URL, OnClickHiddenVideo } = useListVideos(
    setIsVideoPlay,
    isVideoPlay,
    videoRef
  );

  return (
    <section className={`${isVideoPlay ? '' : 'hidden'} `}>
      <video
        ref={videoRef}
        onTouchStart={OnClickHiddenVideo}
        muted
        loop
        src={numberSong ? `${URL}${numberSong}` : ''}
      />
    </section>
  );
}
