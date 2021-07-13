import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  card: {
    width: 150,
    maxWidth: 150,
    height: 100,
    border: 'solid 1px #bbb',
    margin: theme.spacing(.5),
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
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
      <Card className={classes.card}>
        <CardMedia 
          component="img"
          image="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        />
      </Card>
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
    </div>
  );
}
 
export default AddPhotos;