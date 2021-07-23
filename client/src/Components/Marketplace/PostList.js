import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

//test images
import computerImg from '../../Images/computer-image.jpg'
import mugImg from '../../Images/mug-image.jpg'
import phoneImg from '../../Images/phone-image.jpg'
import puppyImg from '../../Images/puppy-image.jpg'
import shoesImg from '../../Images/shoes-image.jpg'
import tshirtImg from '../../Images/tshirt-image.jpg'


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

  return (
    <Grid container item xs={12} md={8} lg={9} style={{ display: "table", padding: 8 }}>
      <Grid container item xs={12}>  
        { PostCard("Computer", computerImg) }
        { PostCard("Mug", mugImg) }
        { PostCard("Phone", phoneImg) }
        { PostCard("Puppy", puppyImg) }
        { PostCard("Shoes", shoesImg) }
        { PostCard("Shirt", tshirtImg) }
      </Grid>  
    </Grid>
  );
}
 
//title, image, location, userID?, 
function PostCard(title, image) {
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
            alt="Contemplative Reptile"
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

export default PostList;