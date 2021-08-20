import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import ItemCarousel from './ItemCarousel';
import Title from './Title';
import Owner from './Owner';
import Description from './Description';
import InReturn from './InReturn';
import Buttons from './Buttons';

import { UserContext } from '../../Context/UserContext';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 5, 2),
  }
}));

const Item = () => {
  useRequireAuth();

  const classes = useStyles();
  const params = useParams();

  const [ user, setUser ] = useContext(UserContext);
  const [ post, setPost ] = useState({});
  const [ isOwnPost, setIsOwnPost ] = useState(true);

  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/${params.id}`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      setPost(data.post);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (post.userId && user._id) {
      if (post.userId._id === user._id) setIsOwnPost(true);
      else setIsOwnPost(false);
    }
  }, [post, user]);

  return (  
    <Container maxWidth="md" className={classes.root}>
      <ItemCarousel post={post} />
      <Title post={post} />
      <Owner post={post} />
      <Description post={post} />
      <InReturn post={post} />
      { !isOwnPost && <Buttons /> }
    </Container>
  );
}
 
export default Item;