import Https from 'https';
import axios, {  AxiosResponse, AxiosError } from 'axios';

export const closeSession = (arg) => {
  const { host, numeroDocumento, maquina, token } = arg;
  var data = {
    nombreServicio: 'cerrarFidelizacionMaquina',
    numeroDeParametros: '3',
    parametros: [
      {
        nombreParametro: 'serial',
        valorParametro: `${maquina}`
      },{
        nombreParametro: 'numeroDocumento',
        valorParametro: numeroDocumento+"",
      },{
        nombreParametro: 'tipoDispositivo',
        valorParametro: 'MOVIL'
      },
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
      console.log(res.data, "servicio")
      return res.data;

    })
    .catch((error: AxiosError) => {
      return error
    });
};
