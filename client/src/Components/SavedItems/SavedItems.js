import { useState ,useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Title from './Title';
import Cards from './Cards';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

import { UserContext } from '../../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 2, 10, 2),
  }
}));

const SavedItems = () => {
  useRequireAuth();

  const classes = useStyles();

  const [ user, setUser ] = useContext(UserContext);
  const [ showLoader, setShowLoader ] = useState(true);

  useEffect(() => { 
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setShowLoader(false);
    })
    .catch(err => {
      console.log(err);
      setShowLoader(false);
    });
  }, []);


  return (  
    <Container maxWidth="md" className={classes.root}> 
      <Title />
      <Cards 
        showLoader={showLoader}
      />
    </Container>
  );
}
 
export default SavedItems;