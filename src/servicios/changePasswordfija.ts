/* eslint-disable import/prefer-default-export */
import Https from 'https';
import axios from 'axios';

export const changePassowrdSet = async (arg) => {
  const { host, numeroDocumento, claveNueva, token, claveAnterior } = arg;
  var data = {
    nombreServicio: 'cambiarClave',
    numeroDeParametros: '4',
    parametros: [

      {
        nombreParametro: 'numeroDocumento',
        valorParametro: numeroDocumento
      },
      {
        nombreParametro: 'claveAnterior',
        valorParametro: `${claveAnterior}`,
      },
      {
        nombreParametro: 'nuevaClave',
        valorParametro: `${claveNueva}`,
      },
      {
        nombreParametro: 'tipoDispositivo',
        valorParametro: `MOVIL`,
      },
    ],
  };
  let config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/cambiarclave`,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    data: data,
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error
  }
};
