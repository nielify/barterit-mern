import { useState ,useEffect } from 'react';
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

  const [ savedPosts, setSavedPosts ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [ showEmpty, setShowEmpty ] = useState(false);

  useEffect(() => { 
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      if (!data.savedPosts[0]) setShowEmpty(true);
      setSavedPosts(data.savedPosts);
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
        savedPosts={savedPosts}
        setSavedPosts={setSavedPosts}
        showLoader={showLoader}
        showEmpty={showEmpty}
        setShowEmpty={setShowEmpty}
      />
    </Container>
  );
}
 
export default SavedItems;