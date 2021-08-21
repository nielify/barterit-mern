import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles((theme) => ({
  root: {   
    textAlign: 'center',
    position: 'relative',
    marginBottom: theme.spacing(1),
  },
  image: {
    marginTop: theme.spacing(1),
    borderRadius: 15,
    height: '60vh',
    objectFit: 'contain',
    width: '80%',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '60vh',
    zIndex: -999,
    filter: 'blur(20px)',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  }
}));

const ItemCarousel = ({ post }) => {
  const classes = useStyles();

  return (  
    <Carousel 
      className={classes.root}
      navButtonsProps={{ // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          opacity: .6,
        }
      }} 
      animation="slide"
      swipe="true"
      navButtonsAlwaysVisible="true"
      autoPlay={false}
      timeout={250}
    >
      { post._id ? post.images.map((image, i) => (
        <Item key={i} image={image} />
      )) : null }
    </Carousel>
  );
}
 
function Item({ image }) {
  const classes = useStyles();

  return (
    <>
      <img src={image} alt="main" className={classes.image}/>
      <img src={image} alt="background" className={classes.imageBackground}/>
    </>
  )
}

export default ItemCarousel;