import React, { createContext, ReactChildren, useState } from 'react';


export const DataContext = createContext({});

export default function DataProvider( {children} : any) {
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [config, setConfig] = useState();
  const [listProducts, setListProducts] = useState();
  const [barCategory, setBarCategory] = useState();
  const [error, setError] = useState(false);
  const [errorConfig, setErrorConfig] = useState(true);

  return (
    <DataContext.Provider
      value={{
        data,
        listProducts,
        barCategory,
        setConfig,
        config,
        errorConfig,
        setErrorConfig,
        setToken,
        token,
        setError,
        error,
        setData,
        setListProducts,
        setBarCategory
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
