import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
    textDecoration: 'none',
  },
  cardContent: {
    padding: theme.spacing(.5, 1, .4, 1),
  },
  location: {
    position: 'relative',
    top: -4,
    fontSize: '.83rem', 
  },
  
}));

const PostList = () => {
  const classes = useStyles();

  const [ showLoader, setShowLoader ] = useState(true);
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      setPosts(data.allPosts);
      setShowLoader(false);
    })
    .catch(err => {
      console.log(err);
      setShowLoader(false);
    });

  }, []);

  return (
    <Grid container item xs={12} md={8} lg={9} style={{ display: "table", padding: 8 }}>
      { showLoader && <Loader /> } 
      <Grid container item xs={12}> 
        { posts.map((post, i) => (
          <PostCard title={post.title} image={post.images[0]} key={i}/>
        )) }
      </Grid> 
    </Grid>
  );
}
 
//title, image, location, userID?, 
function PostCard({ title, image }) {
  const classes = useStyles();

  const handleClick = async () => {
    /*const res = await fetch('http://localhost:3001/test', { credentials: 'include' });
    const data = await res.json();
    console.log(data);*/
  }

  return (
    <Grid item xs={6} sm={4} lg={3} 
      component={Link}
      to="/item"
      style={{textDecoration: 'none'}}
    >
      <Card className={classes.root} >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={ title }
            height="180"
            image={image}
            //style={{objectFit: 'fill'}}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" component="h3" style={{fontSize: '1rem' }}>
              { title }
            </Typography>
            <Typography variant="body1" className={classes.location}>
              Sariaya
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

function Loader() {
  const classes = useStyles();

  return(
    <div style={{textAlign: 'center'}}>
      <CircularProgress 
        style={{color: '#999'}}
      />
    </div>
  )
}

export default PostList;