/* eslint-disable import/prefer-default-export */
import Https from 'https';
import axios from 'axios';

export const anularPeticion = async (arg) => {
  const { host, numeroDocumento, maquina, token, puk } = arg;
  var data = {
    nombreServicio: 'anularPeticion',
    numeroDeParametros: '4',
    parametros: [
      {
        nombreParametro: 'nota',
        valorParametro: '',
      },
      {
        nombreParametro: 'haySesion',
        valorParametro: numeroDocumento ? 'si' : 'no',
      },
      {
        nombreParametro: 'serial',
        valorParametro: `${maquina}`,
      },
      {
        nombreParametro: 'idPeticion',
        valorParametro: `${puk}`,
      },
    ],
  };
  let config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/anularPeticion`,
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
    return {
      error: 'No se conecto al servidor',
    };
  }
};
