import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

import ChatList from './ChatList';
import ChatBox from './ChatBox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const Negotiations = () => {
  useRequireAuth();
  const classes = useStyles();

  //window height
  const heightRef = useRef(window.innerHeight);
  const [height, setHeight] = useState(heightRef.current);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight)
    });

    return () => {
      window.removeEventListener('resize', () => {});
    }
  },[]);

  return (  
    <Container maxWidth="md" className={classes.root} style={{height: `calc(${height}px - 64px)`}}>
      <ChatList />
      <ChatBox />
    </Container>
  );
}
 
export default Negotiations;