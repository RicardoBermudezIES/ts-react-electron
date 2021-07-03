import Home from '../view/Home';
import Login from '../view/Login';
import Bar from '../view/Bar';
import Configuracion from '../view/Configuracion';


export const router = [
  { path: '/configuracion', component: Configuracion },
  { path: '/bar', component: Bar },
  { path: '/login', component: Login },
  { path: '/', component: Home },
];
