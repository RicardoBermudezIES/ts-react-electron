import Https from 'https';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const loginSmol = (arg) => {
  const { host, user, password } = arg;
  let data = JSON.stringify({ login: user, password: password });
  let config : AxiosRequestConfig = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/authentication`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return axios(config)
    .then((res: AxiosResponse) => {
     return res.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
};
