import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import jakeImage from '../../Images/jake_rebullo.jpg';
import araImage from '../../Images/ara_merillo.jpg';
import mugImage from '../../Images/mug-image.jpg';
import puppyImage from '../../Images/puppy-image.jpg';
import shoesImage from '../../Images/shoes-image.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    minWidth: 350,
    width: '25%',
    border: 'solid 1px #bbb',
    borderLeft: 0,
    margin: 0,
    padding: 0,
    background: '#fff',
    minHeight: 'calc(100vh - 64px)',
    transition: 'transform 0.3s ease-out',
    zIndex: 9,
  },
  mobile: {
    transform: 'translateX(-97%)',
  },
  chatlistOpen: {
    transform: 'translateX(0%)',
  },
  arrowIcon: {
    borderRadius: '50%',
    background: '#009688',
    position: 'absolute',
    top: 'calc(50% - 20px)',
    right: '-25px',
    zIndex: 10,
  }, 

  title: {
    padding: theme.spacing(2,0,2,3),
    //borderBottom: 'solid 2px #bbb'
  },  
  item: {
    borderRadius: 10,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2)
  },
 
}));

const ChatList = ({ matches }) => {
  const classes = useStyles();
  

  const [activeChat, setActiveChat] = useState('');

  //button
  const [ collapseButtons, setCollapseButtons ] = useState(true);
  const handleCollapseButtons = () => {
    setCollapseButtons(!collapseButtons);
  }

  const handleActiveChat = (id) => {
    setTimeout(() => {
      setActiveChat(id);
    }, 300);
  }

  useEffect(() => {
    if (matches) setCollapseButtons(true);
    else setCollapseButtons(false);
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
      className={`${classes.root} ${matches ? classes.mobile : ''} ${!collapseButtons ? classes.chatlistOpen : ''}`}
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
        gutterBottom
      >
        Negotiations
      </Typography>
      <List component="nav" style={{padding: '0 8px 0 8px'}}>
        {mockNegotiations.map((mockNegotiation) => (
          <ListItem 
            button 
            key={mockNegotiation.id} 
            onClick={() => handleActiveChat(mockNegotiation.id)}
            className={classes.item}
            style={{
              background: activeChat === mockNegotiation.id ? 'rgba(0, 185, 167, .2)' : '',
            }}
          >
            <ListItemIcon>
              <Avatar alt={mockNegotiation.name} src={mockNegotiation.image} className={classes.avatar} />
            </ListItemIcon>
            <ListItemText primary={mockNegotiation.name} /* style={{color: activeChat === mockNegotiation.id ? '#fff' : ''}} */ />
          </ListItem>
        ))}
      </List>     
    </div>
  );
}

export default ChatList;