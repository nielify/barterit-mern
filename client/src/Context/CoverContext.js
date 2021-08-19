import { useState, createContext } from 'react';

export const CoverContext = createContext();

export const CoverProvider = (props) => {
  const [ cover, setCover ] = useState(true);

  return (
    <CoverContext.Provider value={[cover, setCover]}>
      { props.children }
    </CoverContext.Provider>
  );
}