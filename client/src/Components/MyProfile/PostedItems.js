import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
  },
  container: {
    //border: 'solid 1px #bbb',
    width: '100%',
  },
  cardContent: {
    padding: theme.spacing(1, .5),
  },
  note: {
    margin: '0 auto',
  }
}));

const PostedItems = () => {
  const classes = useStyles();

  const [ posts, setPosts ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [ note, setNote ] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/my-posts`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      if (!data.posts[0]) {
        setNote(`You have not posted any items on Marketplace yet`);
      }
      setPosts(data.posts);
      setShowLoader(false);
    })
    .catch(err => {
      console.log(err);
      setNote('An error has occured');
      setShowLoader(false);
    });

  }, []);

  return (  
    <>
      <Typography
        color="primary"
        variant="h6"
        className={classes.title}
        gutterBottom
      >
        Your items in Marketplace
      </Typography>
      { showLoader && <Loader /> }
      <Grid container className={classes.container}>
        { !posts[0] && !showLoader && 
        <Typography
          variant="body2"
          className={classes.note}
        >
          { note }
        </Typography> }
        {posts.map((post,i) => (
          <PostCard title={post.title} image={post.images[0]} date={post.createdAt} id={post._id} key={i} />
        ))}      
      </Grid>
      {/* {<Typography
        style={{textAlign:'center', width: '100%'}}
      >
        You do not have any posted items in Marketplace.
      </Typography>} */}
    </>
  );
}
 
function PostCard({ title, image, date, id }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} lg={3}
      component={Link}
      to={`/item/${id}`}
      style={{textDecoration:'none'}}
    >
      <Card style={{margin:'0 4px .5px 4px'}} elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="post"
            height="180"
            image={image}
            //style={{objectFit: 'fill'}}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" component="h3" style={{fontSize: '1rem', lineHeight: 1.1 }}>
              { title }
            </Typography>
            <Typography variant="body1" component="p" style={{fontSize: '.8rem',}}>
              { moment(date).format('LLL') }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
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

export default PostedItems;