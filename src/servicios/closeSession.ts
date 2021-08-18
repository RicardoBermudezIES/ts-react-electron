import Https from 'https';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const closeSession = (arg) => {
  const { host, numeroDocumento, serial, token } = arg;
  var data = {
    nombreServicio: 'cerrarFidelizacionMaquina',
    numeroDeParametros: '3',
    parametros: [
      { nombreParametro: 'serial', valorParametro: `${serial}` },
      {
        nombreParametro: 'numeroDocumento',
        valorParametro: numeroDocumento+"",
      },
      { nombreParametro: 'tipoDispositivo', valorParametro: 'MOVIL' },
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/cerrarFidelizacionMaquina`,
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
      console.log(error);
    });
};
