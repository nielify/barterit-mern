import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import PersonalInfo from './PersonalInfo';
import PostedItems from './PostedItems';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({

}));

const User = () => {
  const classes = useStyles();
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${params.id}`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    }) 
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (  
    <Container maxWidth="md" className={classes.root}>
      <PersonalInfo />
      <PostedItems />
    </Container>
  );
}
 
export default User;