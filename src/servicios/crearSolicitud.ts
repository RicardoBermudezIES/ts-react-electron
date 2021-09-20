import Https from 'https';
import axios from 'axios';


export const crearSolicitud = async (arg) => {
  const { userAdmin, host, numeroDocumento, maquina, token, casino } = arg;
  var data = {
    nombreServicio: 'solicitudCliente',
    numeroDeParametros: '6',
    parametros: [
      {
        nombreParametro:"nombreUsuario",
        valorParametro: userAdmin

      },{
        nombreParametro: "codigoCasino",
        valorParametro: casino
      },{
        nombreParametro: 'serial',
        valorParametro: `${maquina}`
      },
      {
        nombreParametro: 'estado',
        valorParametro: 'PENDIENTE'
      },
      {
        nombreParametro: 'documentoCliente',
        valorParametro: numeroDocumento ? numeroDocumento+"" : null
      },
      {
        nombreParametro: 'idsolicitud',
        valorParametro: ""
      },
    ],
  };
  var config = {
    method: 'post',
    url: `https://${host}:8443/MobilAppV2/soporte/solicitudCliente`,
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
