import Https from 'https';
import axios from 'axios';

export const confirmarPeticion = async (arg) => {
  const { host, numeroDocumento ,maquina, token, puk } = arg;
  var data = {
    nombreServicio: 'confirmarPeticion',
    numeroDeParametros: '3',
    parametros: [
     {
        nombreParametro: 'haySesion',
        valorParametro: numeroDocumento ? "si" : "no"
      },{
        nombreParametro: 'serial',
        valorParametro: `${maquina}`
      },
      {
        nombreParametro: 'idPeticion',
        valorParametro: `${puk}`
      },
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/bar/confirmarPeticion`,
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
    return  error;
  }
};
