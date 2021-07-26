import React, { useEffect, useState } from 'react';
import useInactivy from '../../Hook/useInactivy';
const fs = require('fs');

export default function VideoPromocional() {
  const URL_BASE = '/home/front/fidelizacion';
  const path = '/home/front/fidelizacion/';

  const [numberMax, setNumberMax] = useState(0);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(false);
  const { isVideoPlay, setIsVideoPlay } = useInactivy();

  let numberSong = 1;

  const OnClickHiddenVideo = () => {
    const videoEl = document.querySelector('#video');
    setIsVideoPlay(!isVideoPlay);
    console.log(isVideoPlay + 'App');
    videoEl.autoplay = false;
    videoEl.muted = true;
  };

  const getListVideos = () => {
    const nameVideo = fs
      .readdirSync(URL_BASE, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((item) => item.name);
    setSongs(nameVideo);
    setNumberMax(nameVideo.length);
  };

  useEffect(() => {
    getListVideos();
  }, []);

  useEffect(() => {
    if (isVideoPlay === true) {
      const videoEl = document.querySelector('#video');
      videoEl.muted = false;
    } else {
      const videoEl = document.querySelector('#video');
      videoEl.muted = true;
    }
  }, [isVideoPlay]);

  const changeVideo = () => {
    console.log('cambiando el video', numberSong, numberMax);
    getListVideos();
    if (numberSong < numberMax) {
      console.log(numberMax, numberSong);
      numberSong += 1;
      console.log(numberMax, numberSong);
    } else if (numberSong === numberMax) {
      numberSong = 1;
    }
  };

  useEffect(() => {
    setInterval(() => {
      changeVideo();
    }, 1000 * 60 * 2);
  }, [numberMax]);

  return (
    <section className={`${isVideoPlay ? '' : 'hidden'} `}>
      <video
        id="video"
        onTouchStart={OnClickHiddenVideo}
        autoPlay
        muted
        loop
        src={`${path}-${songs[numberSong]}`}
        type="video/mp4"
      ></video>
    </section>
  );
}
