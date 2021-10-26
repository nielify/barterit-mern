import { useState, createContext } from 'react';

export const ActiveChatContext = createContext();

export const ActiveChatProvider = (props) => {
  const [ activeChat, setActiveChat ] = useState('');

  return (
    <ActiveChatContext.Provider value={[activeChat, setActiveChat]}>
      { props.children }
    </ActiveChatContext.Provider>
  );
}