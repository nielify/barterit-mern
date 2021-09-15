import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '65%',
    
    border: 'solid 1px #bbb',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  messageBox: {
    height: '95%'
  }
}));

const ChatBox = () => {
  const classes = useStyles();

  return (  
    <div className={classes.root}>
      <div className={classes.messageBox}>
      </div>
      <TextField variant="outlined" size="small" label="Type your message here..." />
    </div>
  );
}
 
export default ChatBox;