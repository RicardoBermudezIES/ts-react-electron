import { ipcRenderer } from "electron";
import { useEffect, useState} from "react";
const ipc = ipcRenderer;
export default function useToken() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const sendAuth = () => {
      const auth = JSON.parse(window.localStorage.getItem('authConfig'));
      ipc.send('allways-auth', auth);
    };
    var myInterval3;
    if (localStorage.getItem('authConfig')) {
      myInterval3 =  setInterval(() =>   sendAuth(), 1000 * 60 * 4);
      myInterval3
    }
    return () => {
      clearInterval(myInterval3);
    }
  }, []);



  const getAuth = () => {
    ipc.on('allways-auth', (event, arg) => {
      setToken(arg.token);
      localStorage.setItem('token', arg.token);
    });
  };

  useEffect(() => {
    getAuth();
  }, []);


  return { token }

}
