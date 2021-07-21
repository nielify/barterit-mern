import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Title from './Title';
import Cards from './Cards';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 2, 10, 2),
  }
}));

const SavedItems = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}> 
      <Title />
      <Cards />
    </Container>
  );
}
 
export default SavedItems;