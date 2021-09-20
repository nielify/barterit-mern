import { useEffect, useState, useContext } from 'react';
import useStyles from './ChatListCSS';

import { UserContext } from '../../../Context/UserContext';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const ChatList = ({ matches, negotiations }) => {
  const classes = useStyles();
  
  const [activeChat, setActiveChat] = useState('');
  const [ user ] = useContext(UserContext);

  //button
  const [ collapseButtons, setCollapseButtons ] = useState(false);
  const handleCollapseButtons = () => {
    setCollapseButtons(!collapseButtons);
  }

  const handleActiveChat = (id) => {
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
      style={{boxShadow: matches ? '-3px 5px 10px 0px #444' : '',}}
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
      <List component="nav" className={classes.list}>
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
              <Typography variant="body1" style={{fontWeight: '500',fontSize: '.9rem', color: negotiation.owner._id === user._id ? '#009688' : ''}}>{negotiation.name.length > 21 ? `${negotiation.name.substring(0,20)}...` : negotiation.name }</Typography>
              <Typography variant="subtitle2" style={{fontWeight: 'normal',fontSize: '.8rem'}}>{ user._id !== negotiation.owner._id ? `${negotiation.owner.firstName} ${negotiation.owner.lastName}` : `${negotiation.notOwner.firstName} ${negotiation.notOwner.lastName}` }</Typography>
            </div>
          </ListItem>
        ))}
      </List>     
    </div>
  );
}

export default ChatList;