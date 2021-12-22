import { useEffect, useState } from 'react';
import fs from 'fs';
import os from 'os';
import path from 'path';

export default function useListVideos(
  setIsVideoPlay: Function,
  isVideoPlay: boolean,
) {
  const URL_BASE: string = path.join(os.homedir(), 'fidelizacion');

  const [listPromocional, setListPromocional] = useState<string[]>([]);
  const [error, setError] = useState('');

  const getListVideos = (URL_BASE: string): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
      fs.readdir(URL_BASE, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(err)
        } 
        else {
          resolve(files.map((item) => item.name));
        }
      });
    });
  };

  useEffect(() => {
    getListVideos(URL_BASE)
      .then((res: string[]) => {
        setListPromocional(res);
        console.log(listPromocional);
        
      })
      .catch(() => {
          setError('Volviendo a buscar videos');
          getListVideos(URL_BASE)
          .then((res: string[]) => {
            setListPromocional(res);
            console.log(listPromocional);
        
      })
      });
  }, []);


  const OnClickHiddenVideo = () => {
    setIsVideoPlay(!isVideoPlay);
    console.log(isVideoPlay + 'App');
  };


  return { listPromocional, error, URL_BASE, OnClickHiddenVideo };
}
