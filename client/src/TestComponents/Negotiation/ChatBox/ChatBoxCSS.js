import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '75%',
    borderRight: 0,
    borderLeft: 'solid 2px #bbb',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: 'calc(100vh - 64px - 54px)',
  },
  mobile: {
    position: 'absolute',
    left: '1.5%',
    width: '98.5%',
    border: 0,
    paddingLeft: theme.spacing(2),
  },
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderBottom: 'solid 2px #eee'
  },
  title: {
    display: 'flex',
    flexFlow: 'column',
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
    padding: theme.spacing(0, 1.5),
    marginBottom: theme.spacing(1),
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 20,
    },
  },
  systemMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}));

export default useStyles;