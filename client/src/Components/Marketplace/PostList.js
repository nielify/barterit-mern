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
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  
}));

const PostList = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={8} lg={9} style={{ display: "table", padding: 8 }}>
      <Grid container item xs={12}>  
        { PostCard(computerImg) }
        { PostCard(mugImg) }
        { PostCard(computerImg) }
        { PostCard(phoneImg) }
        { PostCard(puppyImg) }
        { PostCard(shoesImg) }
        { PostCard(tshirtImg) }
      </Grid>  
    </Grid>
  );
}
 
//title, image, location, userID?, 
function PostCard(image) {
  const classes = useStyles();

  const handleClick = async () => {
    /*const res = await fetch('http://localhost:3001/test', { credentials: 'include' });
    const data = await res.json();
    console.log(data);*/
  }

  return (
    <Grid item xs={6} sm={4} lg={3}>
      <Card className={classes.root}>
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
              Lizard the friggin dog the friggin dogthe friggin dog
            </Typography>
            <Typography variant="p" component="p" style={{fontSize: '.85rem',}}>
              Sariaya
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default PostList;