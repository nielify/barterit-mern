import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

const Title = () => {
  const classes = useStyles();

  return (  
    <Typography
      component="h1" 
      variant="h5" 
      color="primary" 
      gutterBottom
    >
      Saved Items from Marketplace
    </Typography>
  );
}
 
export default Title;