import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
    padding: 0,
    overflow: 'hidden'
  },
  capturedImageContainer: {
    width: width * .8, 
    height: width * .8, 
    maxWidth: 420, 
    maxHeight: 420, 
    marginBottom: 160, 
    marginTop:32, 
    border: 'solid 5px #009688', 
    borderRadius: '50%', 
    overflow: 'hidden',
  }
}));

export default useStyles;