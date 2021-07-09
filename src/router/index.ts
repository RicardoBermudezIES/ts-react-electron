import Home from '../view/Home';
import Login from '../view/Login';
import Bar from '../view/Bar';
import Configuracion from '../view/Configuracion';
import Producto from '../view/Producto';
import Puntos from '../view/Puntos';


export const router = [
  { path: '/configuracion', component: Configuracion },
  { path: '/bar', component: Bar },
  { path: '/puntos', component: Puntos },
  { path: '/producto/:id', component: Producto },
  { path: '/login', component: Login },
  { path: '/', component: Home },
];
