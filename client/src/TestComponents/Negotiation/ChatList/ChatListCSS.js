import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    minWidth: 320,
    width: '25%',
    borderLeft: 0,
    margin: 0,
    padding: 0,
    paddingBottom: 8,
    background: '#fff',
    height: 'calc(100vh - 64px)',
    transition: 'transform 0.3s ease-out',
    zIndex: 9,
    overflow: 'hidden'
  },
  chatlistClose: {
    transform: 'translateX(-95%)',
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
    padding: theme.spacing(2,0,2,1),
    margin: theme.spacing(0, 2),
    height: '4%',
    borderBottom: 'solid 2px #bbb'
  },  
  list: {
    maxHeight: '91%',
    overflow: 'auto',
    padding: '0 16px 0 16px',
    '&::-webkit-scrollbar': {
      width: '3px',
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
  item: {
    borderRadius: 10,
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2)
  },
 
}));

export default useStyles;