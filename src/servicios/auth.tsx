import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const loginSmol = (arg) => {
  const { host, user, password } = arg;
  var data = JSON.stringify({ login: user, password: password });
  var config = {
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
      console.log(error);
    });
};
