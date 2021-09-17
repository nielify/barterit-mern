import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useRequireAuth from '../../CustomHooks/useRequireAuth';

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

  return (  
    <div className={classes.root} /* style={{height: `calc(${height}px - 64px)`}} */>
      <ChatList matches={matches} />
      <ChatBox matches={matches} />
    </div>
  );
}
 
export default Negotiations;