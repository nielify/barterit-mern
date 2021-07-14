import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import PageTitle from './PageTitle';
import AddPhotos from './AddPhotos';
import Fields from './Fields';


const useStyles = makeStyles((theme) => ({
  root: {
    //marginTop: theme.spacing(5),
    padding: theme.spacing(5, 2, 10, 2),
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
      <Fields />
    </Container>  
  );
}

export default CreatePost;