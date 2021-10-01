import { useEffect, useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useRequireAuth from '../../CustomHooks/useRequireAuth';

import { UserContext } from '../../Context/UserContext';

import ChatList from './ChatList/ChatList';
import ChatBox from './ChatBox/ChatBox';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
  }
}));

const Negotiations = () => {
  useRequireAuth();
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:960px)');

  const [user, setUser] = useContext(UserContext);
  const [negotiations, setNegotiations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [activeChat, setActiveChat] = useState('');
  const [negotiation, setNegotiation] = useState(null);
  const socketRef = useRef(null);
  const bottomRef = useRef();

  const [messageLoader, setMessageLoader] = useState(false);

  const scrollToBottom = (behavior) => {
    bottomRef.current.scrollIntoView({ behavior });
  }

  useEffect(() => {
    if (user._id) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/negotiation/negotiations`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          setNegotiations(data);
        })
        .catch(err => {
          console.log(err);
        });
    }

  }, [user]);

  return (
    <div className={classes.root} /* style={{height: `calc(${height}px - 64px)`}} */>
      <ChatList 
        matches={matches} 
        negotiations={negotiations} 
        socketRef={socketRef} 
        setConversation={setConversation}
        setNegotiation={setNegotiation}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        scrollToBottom={scrollToBottom}
        setMessageLoader={setMessageLoader}
      />
      <ChatBox 
        matches={matches} 
        conversation={conversation} 
        negotiation={negotiation}
        setConversation={setConversation}
        socketRef={socketRef} 
        user={user} 
        negotiations={negotiations}
        activeChat={activeChat}
        bottomRef={bottomRef}
        scrollToBottom={scrollToBottom}
        messageLoader={messageLoader}
      />
    </div>
  );
}

export default Negotiations;