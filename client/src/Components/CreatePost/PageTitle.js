import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  }  
}));

const PageTitle = () => {
  const classes = useStyles();

  return (  
    <Typography 
      component="h1" 
      variant="h5" 
      color="primary" 
      className={classes.root}
    >
      Post to Marketplace
    </Typography>
  );
}
 
export default PageTitle;