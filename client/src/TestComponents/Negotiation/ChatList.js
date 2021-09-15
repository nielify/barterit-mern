import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import jakeImage from '../../Images/jake_rebullo.jpg';
import araImage from '../../Images/ara_merillo.jpg';
import mugImage from '../../Images/mug-image.jpg';
import puppyImage from '../../Images/puppy-image.jpg';
import shoesImage from '../../Images/shoes-image.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '35%',
    //height: '100%',
    border: 'solid 1px #bbb',
    margin: 0,
    padding: 0,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(2)
  }
}));

const ChatList = () => {
  const classes = useStyles();

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
    <div className={classes.root}>
      <List component="nav" style={{ padding: 0}}>
        { mockNegotiations.map((mockNegotiation) => (
          <>
            <ListItem button key={mockNegotiation.name}>
              <ListItemIcon>
                <Avatar alt={mockNegotiation.name} src={mockNegotiation.image} className={classes.avatar} />
              </ListItemIcon>
              <ListItemText primary={mockNegotiation.name} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}
 
export default ChatList;