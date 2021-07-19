import React, { createContext, ReactChildren, useState } from 'react';


export const DataContext = createContext({});

export default function DataProvider( {children} : any) {
  const [data, setData] = useState();
  const [globalPuntos, setGlobalPuntos] = useState();
  const [config, setConfig] = useState();
  const [casino, setCasino] = useState();
  const [maquina, setMaquina] = useState();
  const [listProducts, setListProducts] = useState();
  const [barCategory, setBarCategory] = useState();
  const [error, setError] = useState(false);
  const [errorConfig, setErrorConfig] = useState(false);
  const [vinculacion, setVinculacion] = useState(false);


  return (
    <DataContext.Provider
      value={{
        setGlobalPuntos,
        globalPuntos,
        data,
        listProducts,
        barCategory,
        setConfig,
        config,
        errorConfig,
        setErrorConfig,
        setError,
        error,
        setData,
        setListProducts,
        setBarCategory,
        setVinculacion,
        vinculacion,
        setCasino,
        casino,
        setMaquina,
        maquina
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
