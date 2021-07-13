import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    //letterSpacing: -2,
  },
}));

const CreatePost = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md"> 
      <Typography 
        component="h1" 
        variant="h5" 
        color="primary" 
        className={classes.typography} 
      >
        Post an item to marketplace
      </Typography>
    </Container>  
  );
}
 


export default CreatePost;