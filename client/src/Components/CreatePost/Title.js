import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  }  
}));

const Title = () => {
  const classes = useStyles();

  return (  
    <Typography 
      component="h1" 
      variant="h5" 
      color="primary" 
      className={classes.root}
    >
      post title
    </Typography>
  );
}
 
export default Title;