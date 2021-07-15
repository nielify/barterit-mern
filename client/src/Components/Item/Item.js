import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import ItemCarousel from './ItemCarousel';
import Title from './Title';
import Description from './Description';
import Owner from './Owner';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 10, 2),
  }
}));

const Item = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}>
      <ItemCarousel />
      <Title />
      <Description />
      <Owner />
    </Container>
  );
}
 
export default Item;