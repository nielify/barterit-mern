import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import PageTitle from './PageTitle';
import AddPhotos from './AddPhotos';
import Fields from './Fields';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2, 10, 2),
  },
  typography: {
    //letterSpacing: -2,
  },
}));

const CreatePost = () => {
  useRequireAuth();

  const classes = useStyles();

  //image state
  const [ imageFiles, setImagesFiles ] = useState([]);
  const [ imageError, setImageError ] = useState(false);  

  return (  
    <Container maxWidth="md" className={classes.root}> 
      <PageTitle />
      <AddPhotos imageFiles={imageFiles} setImagesFiles={setImagesFiles} imageError={imageError} setImageError={setImageError} />
      <Fields imageFiles={imageFiles} setImagesFiles={setImagesFiles} imageError={imageError} setImageError={setImageError} />
    </Container>  
  );
}

export default CreatePost;