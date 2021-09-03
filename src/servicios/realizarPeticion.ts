import Https from 'https';
import axios, {  AxiosResponse, AxiosError } from 'axios';

export const realizarPeticion = (arg) => {
  const { host, numeroDocumento, maquina, token, puk } = arg;
  var data = {
    nombreServicio: 'realizarPeticion',
    numeroDeParametros: '3',
    parametros: [
      {
        nombreParametro: 'numeroDocumento',
        valorParametro: numeroDocumento ? numeroDocumento+"" : null,

      },{
        nombreParametro: 'serial',
        valorParametro: `${maquina}`
      },{
        nombreParametro: 'idPeticion',
        valorParametro: `${puk}`
      },
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/realizarPeticion`,
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
      console.log(res.data, "servicio")
      return res.data;

    })
    .catch((error: AxiosError) => {
      return error
    });
};
