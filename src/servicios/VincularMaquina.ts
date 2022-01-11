import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const VincularMaquina = (arg) => {
  let data = {
    "nombreServicio":"iniciarFidelizacion",
    "numeroDeParametros":"1",
    "parametros":[
        {
            "nombreParametro":"serial",
            "valorParametro": `${arg.serial}`
        }
    ]
  };

  var config = {
    method: 'post',
    url: `https://${arg.host}:8443/MobilAppV2/fidelizacion/iniciarFidelizacion`,
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
      return {
        error: 'No se conecto al servidor',
      };
    });
};
