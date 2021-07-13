import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const getMaquinas = (arg) => {
  let data = {
    nombreServicio: 'listarDispositivos',
    numeroDeParametros: '3',
    parametros: [
      { nombreParametro: 'codigoCasino', valorParametro: arg.idCasino.toString() },
      { nombreParametro: 'first', valorParametro: '0' },
      { nombreParametro: 'pageSize', valorParametro: '1000' },
    ],
  };

  var config = {
    method: 'post',
    url: `https://${arg.host}:8443/MobilAppV2/configuracion/listarDispositivos`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${arg.token}`,
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
