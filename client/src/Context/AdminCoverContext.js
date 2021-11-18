import { useState, createContext } from 'react';

export const AdminCoverContext = createContext();

export const AdminCoverProvider = (props) => {
  const [ adminCover, setAdminCover ] = useState(true);

  return (
    <AdminCoverContext.Provider value={[adminCover, setAdminCover]}>
      { props.children }
    </AdminCoverContext.Provider>
  );
}