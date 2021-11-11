import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
    padding: 0,
    overflow: 'hidden',
    height: '90vh',
  },
  capturedImageContainer: {
    maxWidth: 420, 
    maxHeight: 420, 
    marginBottom: 50, 
    marginTop:32, 
    border: 'solid 5px #009688', 
    borderRadius: '50%', 
    overflow: 'hidden',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3,4),
    borderRadius: 10,
    maxWidth: 450,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default useStyles;