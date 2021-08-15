import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import ItemCarousel from './ItemCarousel';
import Title from './Title';
import Owner from './Owner';
import Description from './Description';
import InReturn from './InReturn';
import SubmitButton from './SubmitButton';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 5, 2),
  }
}));

const Item = () => {
  const classes = useStyles();
  const params = useParams();

  const postId = 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/${params.id}`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      
    });
  }, []);

  return (  
    <Container maxWidth="md" className={classes.root}>
      <ItemCarousel />
      <Title />
      <Owner />
      <Description />
      <InReturn />
      <SubmitButton />
    </Container>
  );
}
 
export default Item;