import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '75%',
    borderRight: 0,
    borderLeft: 'solid 2px #bbb',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    overflow: 'hidden',
    height: 'calc(100vh - 64px)',
  },
  mobile: {
    position: 'absolute',
    left: '1.5%',
    width: '98.5%',
    border: 0,
    paddingLeft: theme.spacing(2),
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '95%',
    marginBottom: theme.spacing(1),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      borderRadius: '150px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'inherit',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'inherit',
      borderRadius: '10px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: '#bbb',
    }, 
  },
  dummydivTop: {
    flex: '1 1 auto'
  },
  messageContainer: {
    display: 'flex',
    margin: '2px 12px'
  },  
  ownMessage: {
    padding: theme.spacing(1, 1.8),
    background: '#009688',
    color: '#fff',
    maxWidth: '65%',
    borderRadius: 20,
  },
  otherMessage: {
    padding: theme.spacing(1, 1.8),
    background: '#a6a6a6',
    color: '#fff',
    borderRadius: 20,
    maxWidth: '65%',
  },
  inputBox: {
    display: 'flex',
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 20,
    },
  }
}));

export default useStyles;