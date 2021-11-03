import { useEffect, useState, useContext } from 'react';
import useStyles from './ChatListCSS';

import { UserContext } from '../../../Context/UserContext';

import { io } from "socket.io-client";

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const ChatList = ({ matches, negotiations, socketRef, setConversation, setNegotiation, activeChat, setActiveChat, scrollToBottom, setMessageLoader, height, loading, isNegoEmpty }) => {
  const classes = useStyles();
  
  const [ user ] = useContext(UserContext);

  //button
  const [ collapseButtons, setCollapseButtons ] = useState(false);
  const handleCollapseButtons = () => {
    setCollapseButtons(!collapseButtons);
  }

  const handleActiveChat = async (id) => {
    //close negotiation list if in mobile size
    if (matches) handleCollapseButtons();

    //onLoader
    setMessageLoader(true);

    //clear chatbox
    setNegotiation(null);
    setConversation(null);

    //clear socket when selecting negotiations
    if (socketRef.current) socketRef.current.disconnect();
    socketRef.current = null;
    
    //create new socket and assign to socketRef
    const newSocket = io(`${process.env.REACT_APP_SERVER_DOMAIN}`); 
    socketRef.current = newSocket;

    //send negotiation id and user id to backend when joining chat
    socketRef.current.emit('join-chat', {negotiation_id: id, user_id: user._id});

    //update the conversation messages based on the negotiation's conversation
    socketRef.current.on('update-chat', (negotiation) => {
      setNegotiation(negotiation);
      setConversation(negotiation.conversation);
      scrollToBottom('auto');
      setMessageLoader(false);
    });

    //pop notification 
    user.notifications.forEach((notif) => {
      if (notif.negotiation === id) {
        //remove notif on user context
        user.notifications = user.notifications.filter((notif) => notif.negotiation !== id);
        //remove notif on user db
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${user._id}/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })
          .then(data => {
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    setTimeout(() => {
      setActiveChat(id);
    }, 300);
  }

  useEffect(() => {
    if (!matches) setCollapseButtons(false);
  }, [matches]);

  return (
    <div 
      className={`${classes.root} ${!collapseButtons ? '' : classes.chatlistClose}`}
      style={{
        boxShadow: matches ? '-3px 5px 10px 0px #444' : '',
        height: `calc(${height}px - 64px)`
      }}
    >
      {matches && <div className={classes.arrowIcon}>
        <IconButton size='small' onClick={handleCollapseButtons}>
          { !collapseButtons ? <KeyboardArrowLeftIcon fontSize='large' style={{color:'#fff'}} /> : <KeyboardArrowRightIcon fontSize='large' style={{color:'#fff'}} />}
        </IconButton>
      </div> }
      <Typography
        component="h1"
        variant="h5"
        color="primary"
        style={{ fontWeight: 'bold' }}
        className={classes.title}
      >
        Negotiations
      </Typography>
      {!loading && <List component="nav" className={classes.list}>
        {negotiations.map((negotiation) => (
          <ListItem 
            button 
            key={negotiation._id} 
            onClick={() => handleActiveChat(negotiation._id)}
            className={classes.item}
            style={{
              background: activeChat === negotiation._id ? 'rgba(0, 185, 167, .2)' : '',
            }}
          >
            <ListItemIcon>
              <Avatar alt={negotiation.name} src={negotiation.post.images[0]} className={classes.avatar} />
            </ListItemIcon>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Typography variant="body1" style={{fontWeight: '500',fontSize: '.9rem'}}>{ user._id !== negotiation.owner._id ? `${negotiation.owner.firstName} ${negotiation.owner.lastName}` : `${negotiation.notOwner.firstName} ${negotiation.notOwner.lastName}` }</Typography>
              <Typography variant="subtitle2" style={{fontWeight: 'normal',fontSize: '.8rem',  color: negotiation.owner._id === user._id ? '#009688' : ''}}>{negotiation.name.length > 21 ? `${negotiation.name.substring(0,20)}...` : negotiation.name }</Typography>
            </div>
          </ListItem>
        ))}
      </List>}
      {loading && <Loader />}
      {isNegoEmpty && <EmptyMessage />}
    </div>
  );
}

function EmptyMessage() {
  const classes = useStyles();

  return(
    <div className={classes.systemMessage}>
      <Typography
        variant="body2"
        style={{fontSize: '.85rem'}}
      >
        Negotiation is empty <br/>
        Select a post from Marketplace to start a negotiation
      </Typography>
    </div>
  )
}

function Loader() {
  const classes = useStyles();

  return(
    <div style={{height: '91%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress 
        style={{color: '#999'}}
      />
    </div>
  )
}

export default ChatList;