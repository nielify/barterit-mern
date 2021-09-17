import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '75%',
    border: 'solid 1px #bbb',
    borderRight: 0,
    display: 'flex',
    flexDirection: 'column-reverse',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    overflow: 'hidden',
  },
  mobile: {
    position: 'absolute',
    left: '1.5%',
    width: '98.5%',
    border: 0,
    minHeight: 'calc(100vh - 64px)',
  },
  inputBox: {
    display: 'flex'
  }
}));

const ChatBox = ({ matches }) => {
  const classes = useStyles();

  return (  
    <div className={`${classes.root} ${matches ? classes.mobile : ''}`} >
      <div className={classes.messagBox}>
      
      </div>
      <div className={classes.inputBox}>
        <TextField variant="outlined" size="small" label="Type your message..." fullWidth />
        <IconButton size="small" style={{marginLeft: 8}} >
          <SendIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
 
export default ChatBox;