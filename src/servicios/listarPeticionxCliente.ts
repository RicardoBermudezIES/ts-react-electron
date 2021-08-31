import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const getMaquinas = (arg) => {
  const { host, numeroDocumento, maquina, token } = arg;
  let data = {
    nombreServicio: 'listarPeticionesXCliente',
    numeroDeParametros: '2',
    parametros: [
      { nombreParametro: 'numeroDocumento', valorParametro: numeroDocumento+"" },
      { nombreParametro: 'serial', valorParametro: `${maquina}` },
    ],
  };

  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/listarPeticionesXCliente`,
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
      return error;
    });
};
