/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
import { useEffect, useState } from 'react';
import fs from 'fs';
import os from 'os';
import path from 'path';

const URL_BASE: string = path.join(os.homedir(), 'fidelizacion');
export default function useListVideos(
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsVideoPlay: Function,
  isVideoPlay: boolean
) {
  const [listPromocional, setListPromocional] = useState<string[]>([]);
  const [error, setError] = useState('');

  const getListVideos = (): Promise<Array<string>> => {
    return new Promise((resolve, reject) => {
      fs.readdir(URL_BASE, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.map((item) => item.name));
        }
      });
    });
  };

  useEffect(() => {
    getListVideos()
      .then((res: string[]) => setListPromocional(res))
      .catch(() => {
        setError('Volviendo a buscar videos');
        getListVideos().then((res: string[]) => {
          setListPromocional(res);
        });
      });
  }, []);

  const OnClickHiddenVideo = () => {
    setIsVideoPlay(!isVideoPlay);
  };

  return { listPromocional, error, URL_BASE, OnClickHiddenVideo };
}
