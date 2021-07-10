import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
  },
  cardContent: {
    padding: theme.spacing(1),
  }
}));

const PostList = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={8} lg={9} style={{ display: "table", padding: 8 }}>
      <Grid container item xs={12}>  
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
        { PostCard() }
      </Grid>  
    </Grid>
  );
}
 
function PostCard() {
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
            image="https://contemplativepanda.files.wordpress.com/2017/12/collared-lizard3.jpg?w=656"
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" component="h3" style={{fontSize: '1rem'}}>
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