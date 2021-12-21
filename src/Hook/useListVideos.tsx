import { RefObject, useEffect, useState } from 'react';
import fs from 'fs';
import os from 'os';
import path from 'path';

export default function useListVideos(
  setIsVideoPlay: Function,
  isVideoPlay: boolean,
  videoRef: RefObject<HTMLVideoElement>
) {
  const URL_BASE: string = path.join(os.homedir(), 'fidelizacion');

  const URL = `${URL_BASE}/video-fidelizacion-`;
  const [numberMax, setNumberMax] = useState<number>(0);
  const [numberSong, setNumberSong] = useState(1);
  const [hasVideos, setHasVideos] = useState(false);

  const getListVideos = (URL_BASE: string): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
      fs.readdir(URL_BASE, { withFileTypes: true }, (err, files) => {
        if (err) {
          setHasVideos(true);
          reject(err)
        } 
        else {
          setHasVideos(false)
          resolve(files.map((item) => item.name));
        }
      });
    });
  };

  useEffect(() => {
    getListVideos(URL_BASE)
      .then((res: Array<string>) => {
        setNumberMax(res.length);
      })
      .catch(() => {
        getListVideos(URL_BASE).then((res: Array<string>) => {
          setNumberMax(res.length);
        });
      });
  }, []);

  const UpCounterVideo = () => {
    setNumberSong(numberSong + 1);
  };

  const resetVideo = () => {
    if (numberSong > numberMax) {
      setNumberSong(1);
    }
  };

  useEffect(() => {
    resetVideo();
  }, [numberSong]);

  const OnClickHiddenVideo = () => {
    setIsVideoPlay(!isVideoPlay);
    console.log(isVideoPlay + 'App');
    videoRef.current!.muted = true;
    videoRef.current?.pause();
  };

  useEffect(() => {
    if (isVideoPlay === true) {
      videoRef.current!.muted = false;
      videoRef.current!.play();
    } else {
      UpCounterVideo();
      videoRef.current!.muted = true;
      videoRef.current!.pause();
    }
  }, [isVideoPlay]);

  return { hasVideos, numberSong, URL, OnClickHiddenVideo };
}
