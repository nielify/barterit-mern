import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  datagrid:{
    height: '75vh',
    width: '100vw',
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    //padding: theme.spacing(3, 3,),
    borderRadius: 10,
    minWidth: 300,
    maxWidth: 450,
    position: 'relative',
  },
  mainDialog: {
    padding: theme.spacing(3, 3,),
  }
  
}));

export default useStyles;