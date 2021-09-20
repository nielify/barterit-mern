import { useEffect, useState } from 'react';
import useStyles from './ChatListCSS';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import jakeImage from '../../../Images/jake_rebullo.jpg';
import araImage from '../../../Images/ara_merillo.jpg';
import mugImage from '../../../Images/mug-image.jpg';
import puppyImage from '../../../Images/puppy-image.jpg';
import shoesImage from '../../../Images/shoes-image.jpg';

const ChatList = ({ matches, negotiations }) => {
  const classes = useStyles();
  
  const [activeChat, setActiveChat] = useState('');

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

  const mockNegotiations = [
    {
      id: 'Jake Rebullo',
      name: 'Jake Rebullo',
      image: jakeImage
    },
    {
      id: 'Ara Merilo',
      name: 'Ara Merilo',
      image: araImage
    },
    {
      id: 'Some Mug',
      name: 'Some Mug',
      image: mugImage
    },
    {
      id: 'Some Puppy',
      name: 'Some Puppy',
      image: puppyImage
    },
    {
      id: 'Some Shoes',
      name: 'Some Shoes',
      image: shoesImage
    },
    
    
  ];

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
              <Typography variant="body1" style={{fontWeight: 'bold',fontSize: '.95rem'}}>{negotiation.name.length > 21 ? `${negotiation.name.substring(0,20)}...` : negotiation.name }</Typography>
              <Typography variant="subtitle2" style={{fontWeight: 'normal',fontSize: '.8rem'}}>{`${negotiation.owner.firstName} ${negotiation.owner.lastName}`}</Typography>
            </div>
          </ListItem>
        ))}
      </List>     
    </div>
  );
}

export default ChatList;