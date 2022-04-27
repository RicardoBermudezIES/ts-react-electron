import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const ValidarClaveFija = (arg) => {
  const { host, numeroDocumento, clave, token } = arg;
  let data = {
    "nombreServicio":"validarClaveFija",
    "numeroDeParametros":"3",
    "parametros":[
        {
            nombreParametro:"numeroDocumento",
            valorParametro:  `${numeroDocumento}`
        },
        {
            nombreParametro :"tipoDispositivo",
            valorParametro :"MOVIL"
        },
        {
            nombreParametro :"clave",
            valorParametro : `${clave}`
        }
    ]
  };

  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/validarClaveFija`,
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
      return  error;
    });
};
