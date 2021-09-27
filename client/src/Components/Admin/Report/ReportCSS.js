import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'solid 1px #ccc',
    maxHeight: '80vh',
    overflowY: 'auto',
    minWidth: 700,
    
  },
  activeReport: {
    borderLeft: 'solid 5px #009688',

    
  },
  report: {
    borderTop: 'solid 1px #ccc',
    padding: theme.spacing(1, 2, 1, 3),
    transition: 'border 0.2s ease-in-out'
  },
  smallFontContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  smallFont: {
    fontSize: '.8rem',
    color: '#000'
  },
  color: {
    color: '#000'
  },
  hover: {
    '&:hover': {
      color: '#009688',
   },
  }
}));

export default useStyles;