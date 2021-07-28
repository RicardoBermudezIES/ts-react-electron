import path from 'path';
import React, { useEffect, useState } from 'react';
import useInactivy from '../../Hook/useInactivy';
import fs from 'fs'
import os from 'os'

export default function VideoPromocional() {
  const URL_BASE = path.join(os.homedir(), "fidelizacion");

  const URL =  `${URL_BASE}/video-fidelizacion-`;
  const [numberSong, setNumberSong] = useState(1);
  const [numberMax, setNumberMax] = useState<number>(0);
  const [error, setError] = useState(false);
  const { isVideoPlay, setIsVideoPlay } = useInactivy();

  const OnClickHiddenVideo = () => {
    const videoEl = document.querySelector('#video');
    setIsVideoPlay(!isVideoPlay);
    console.log(isVideoPlay + 'App');
    videoEl.muted = true;
  };

  const getListVideos = (URL_BASE): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
      fs.readdir(URL_BASE, { withFileTypes: true }, (err, files) => {
        if (err) reject(err);
        else {
          resolve(files.map((item) => item.name));
        }
      });
    });
  };

  useEffect(() => {
    getListVideos(URL_BASE)
      .then((res: Array<string>) => {
        console.log(res);
        setNumberMax(res.length);
      })
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    if (isVideoPlay === true) {
      const videoEl = document.querySelector('#video');
      videoEl.muted = false;
      videoEl.play();
    } else {
      UpCounterVideo()
      const videoEl = document.querySelector('#video');
      videoEl.muted = true;
      videoEl.pause();

    }
  }, [isVideoPlay]);

  const UpCounterVideo = () => {
    setNumberSong(numberSong + 1);
  }

  const resetVideo = () => {
    if (numberSong > numberMax) {
      setNumberSong(1);
    }
  };


  useEffect(() => {
    resetVideo();
  }, [numberSong]);


  return (
    <section className={`${isVideoPlay ? '' : 'hidden'} `}>
      <video
        id="video"
        onTouchStart={OnClickHiddenVideo}
        autoPlay
        muted
        loop
        src={ numberSong ? `${URL}${numberSong}` : ''}
        type="video/mp4"
      ></video>
    </section>
  );
}
