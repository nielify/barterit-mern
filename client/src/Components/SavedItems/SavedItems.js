import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Title from './Title';
import Cards from './Cards';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 2, 10, 2),
  }
}));

const SavedItems = () => {
  useRequireAuth();

  const classes = useStyles();

  useEffect(() => {

  }, []);

  return (  
    <Container maxWidth="md" className={classes.root}> 
      <Title />
      <Cards />
    </Container>
  );
}
 
export default SavedItems;