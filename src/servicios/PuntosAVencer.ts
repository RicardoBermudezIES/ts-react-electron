import Https from 'https';
import axios from 'axios';

export const visualizarPuntosVencer = async (arg) => {
  const { host, numeroDocumento, casino, token, maquina, intervalos } = arg;
  const data = {
    nombreServicio: 'visualizarPuntosVencer',
    numeroDeParametros: '5',
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
      {
        nombreParametro:"intervalos",
        valorParametro:`${intervalos}`,
    }
    ],
  };
  const config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/fidelizacion/visualizarPuntosVencer`,
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
    return  error;
  }
};
