import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 'solid 1px #bbb',
    padding: theme.spacing(.5),
    marginBottom: theme.spacing(2),
    borderRadius: 5,
  },
  card: {
    height: '100%',
    border: 'solid 1px #bbb',
  },
  buttonActionArea: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
}));

const AddPhotos = () => {
  const classes = useStyles();

  return (  
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Card>
          <CardMedia 
            component="img"
            image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
          />
        </Card>
      </Grid>
      
      <Grid item xs={3} sm={2}>
        <Card className={classes.card}>
          <CardActionArea className={classes.buttonActionArea}>
            <AddPhotoAlternateOutlinedIcon color="primary" />
            <Typography
              variant="subtitle1"
            >
              Add Photo
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
 
export default AddPhotos;