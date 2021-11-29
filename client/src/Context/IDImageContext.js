import { useState, createContext } from 'react';

export const IDImageContext = createContext();

export const IDImageContextProvider = (props) => {
  const [ idImage, setIdImage ] = useState('');

  return (
    <IDImageContext.Provider value={[idImage, setIdImage]}>
      { props.children }
    </IDImageContext.Provider>
  );
}