import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: '#eee',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 999999,
  }
}));

const LoadingCover = () => {
  const classes = useStyles();

  return (  
    <div className={classes.root}>
    </div>
  );
}
 
export default LoadingCover;