import Https from 'https';
import axios from 'axios';


export const todasSolicitudes = async (arg) => {
  const { userAdmin, host, token, casino } = arg;
  var data = {
    nombreServicio: 'listarSolicitudes',
    numeroDeParametros: '2',
    parametros: [
      {
        nombreParametro:"nombreUsuario",
        valorParametro: userAdmin

      },{
        nombreParametro: "codigoCasino",
        valorParametro: casino
      }
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/soporte/listarSolicitudes`,
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
