import Https from 'https';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const reenviarClaveDinamica = (arg) => {
  const { host, nombreUsuario, numeroDocumento, token } = arg;
  let data = {
    "nombreServicio":"reenviarClaveDinamica",
    "numeroDeParametros":"2",
    "parametros":[
        {
            nombreParametro:"nombreUsuario",
            valorParametro:  `${nombreUsuario}`
        },
        {
            nombreParametro :"numeroDocumento",
            valorParametro : `${numeroDocumento}`
        }
    ]
  };

  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/validarClaveDinamica`,
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
