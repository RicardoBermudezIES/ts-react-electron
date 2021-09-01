import Https from 'https';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const visualizarPuntosDia = async (arg) => {
  const { host, numeroDocumento, casino, token, maquina } = arg;
  const data = {
    nombreServicio: 'visualizarPuntosBarXDia',
    numeroDeParametros: '4',
    parametros: [
      {
        nombreParametro: 'serial',
        valorParametro: `${maquina}`,
      },
      {
        nombreParametro: 'numeroDocumento',
        valorParametro: `${numeroDocumento}`,
      },
      {
        nombreParametro: 'tipoDispositivo',
        valorParametro: 'MOVIL',
      },
      {
        nombreParametro: 'codigoCasino',
        valorParametro: `${casino}`,
      },
    ],
  };
  const config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/visualizarPuntosBarXDia,
    httpsAgent: new Https.Agent({ rejectUnauthorized: false }),
    agent: false,
    strictSSL: false,
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    data,
  };

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error;
  }
};
