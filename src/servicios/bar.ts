import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const barServices = (arg) => {
  const { host, casino, token } = arg;
  let data = {
    nombreServicio: 'visualizarPremiosBar',
    numeroDeParametros: '2',
    parametros: [
      { nombreParametro: 'codigoCasino', valorParametro: casino },
      { nombreParametro: 'cargaTodo', valorParametro: 'si' },
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/visualizarPremiosBar`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    data: data,
  };

  return axios(config)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      return {
        error: 'No se conecto al servidor',
      };
    });
};
