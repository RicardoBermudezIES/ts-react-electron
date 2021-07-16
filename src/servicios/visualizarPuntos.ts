import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const visualizarPuntos = (arg) => {
  const { host, numeroDocumento, casino, token, maquina } = arg;
  const data = {
    nombreServicio: 'visualizarPuntos',
    numeroDeParametros: '4',
    parametros: [
      {
        nombreParametro: 'serial',
        valorParametro: maquina,
      },
      {
        nombreParametro: 'numeroDocumento',
        valorParametro: `${numeroDocumento}`,
      },
      {
        nombreParametro: 'tipoDispositivo',
        valorParametro: 'MOVIL',
      },
      {
        nombreParametro: 'codigoCasino',
        valorParametro: casino,
      },
    ],
  };
  const config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/visualizarPuntos`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    data,
  };

  return axios(config)
    .then((res: AxiosResponse) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      return error;
    });
};
