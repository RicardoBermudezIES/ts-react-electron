import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const getCasino = (data) => {
  var config = {
    method: 'post',
    url: `https://${data.host}:8443/MobilAppV2/configuracion/listarCasinos`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${data.token}`,
    },
  };

  return axios(config)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};
