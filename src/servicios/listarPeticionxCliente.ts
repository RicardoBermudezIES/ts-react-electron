import Https from 'https';
import axios from 'axios';

export const listarPeticionesXCliente = async (arg) => {
  const { host, numeroDocumento, maquina, token } = arg;
  let data = {
    nombreServicio: 'listarPeticionesXCliente',
    numeroDeParametros: '2',
    parametros: [
      { nombreParametro: 'numeroDocumento',
      valorParametro: numeroDocumento ? numeroDocumento+"" : null  },
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

  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    return error;
  }
};
