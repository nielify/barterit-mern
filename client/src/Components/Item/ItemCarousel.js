import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';

//test images
import computerImg from '../../Images/computer-image.jpg'
import mugImg from '../../Images/mug-image.jpg'
import phoneImg from '../../Images/phone-image.jpg'
import puppyImg from '../../Images/puppy-image.jpg'
import shoesImg from '../../Images/shoes-image.jpg'
import tshirtImg from '../../Images/tshirt-image.jpg'

const useStyles = makeStyles((theme) => ({
  root: {   
    textAlign: 'center',
    position: 'relative',
    marginBottom: theme.spacing(1),
  },
  image: {
    height: 400,
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 380,
    zIndex: -999,
    filter: 'blur(20px)',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  }
}));

const ItemCarousel = () => {
  const classes = useStyles();

  const [ images, setImages ] = useState([
    computerImg,
    mugImg,
    phoneImg,
    puppyImg,
    shoesImg,
    tshirtImg
  ]);

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
      { images.map((image, i) => (
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
}
 
function Item({ image }) {
  const classes = useStyles();

  return (
    <>
      <img src={image} className={classes.image}/>
      <img src={image} className={classes.imageBackground}/>
    </>
  )
}

export default ItemCarousel;