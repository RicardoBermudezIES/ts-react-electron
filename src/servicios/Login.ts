import axios, { AxiosResponse } from 'axios';
/* eslint-disable import/prefer-default-export */
import Https from 'https';

export const fidelzarMaquina = (arg: {
  host: string;
  numeroDocumento: string;
  serial: string;
  token: string;
}) => {
  const { host, numeroDocumento, serial, token } = arg;
  const data = {
    nombreServicio: 'fidelizarMaquina',
    numeroDeParametros: '3',
    parametros: [
      { nombreParametro: 'serial', valorParametro: `${serial}` },
      {
        nombreParametro: 'numeroDocumento',
        valorParametro: `${numeroDocumento}`,
      },
      { nombreParametro: 'tipoDispositivo', valorParametro: 'MOVIL' },
    ],
  };
  const config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/fidelizarMaquina`,
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
    .catch(() => {
      return  error;
    });
};
