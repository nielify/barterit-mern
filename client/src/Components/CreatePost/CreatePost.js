import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import PageTitle from './PageTitle';
import AddPhotos from './AddPhotos';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  typography: {
    //letterSpacing: -2,
  },
}));

const CreatePost = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}> 
      <PageTitle />
      <AddPhotos />
      <Title />
    </Container>  
  );
}

export default CreatePost;