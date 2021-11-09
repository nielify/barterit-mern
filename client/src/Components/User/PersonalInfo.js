import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    width: '100%',
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    borderRadius: 5,
    marginBottom: theme.spacing(2),
  },
  background: {
    //backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url(${AraBackground})`,
    background: '#aaa',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  info: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  innerInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1.5),
    position: 'relative',
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: 'solid 2px #ccc',
  },
  number: {
    color: '#fff',
    display: 'inline',
    fontSize: '.75rem',
    position: 'absolute',
    top: '.5px',
    marginLeft: theme.spacing(.3),
  },
  name: {
    color: '#fff',
    fontSize: '.95rem',
    position: 'absolute',
    top: '-70%',
    left: 6,
  },
  location: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: '.75rem',
    position: 'absolute',
    bottom: '-50%',
    left: 6,
  },
}));

const PersonalInfo = ({ user }) => {
  const classes = useStyles();

  const [rating, setRating] = useState(0);
  const [rates, setRates] = useState(0);

  const getRates = () => {
    
    let totalStars = 0;
    let totalRatings = 0;

    try {
      user.ratings.forEach((rating) => {
        totalStars += rating.stars;
        totalRatings++;
      }); 
      setRating(totalStars / totalRatings);
      setRates(totalRatings);
    } catch (err) {
      console.log(err)
    }
    

    
  }

  useEffect(() => {
    getRates();
  }, [user]);
  
  return ( 
    <>
      <div className={classes.bgContainer}>
        <div className={classes.background} 
          style={{ backgroundImage: user ? `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url(${user.backgroundPicture})` : '' }} >    
        </div>
        <div className={classes.info}>
          <div className={classes.avatarContainer}>
            <Avatar src={user.profilePicture} className={classes.avatar} />
          </div>
          <div className={classes.innerInfo}>
            <Typography
              className={classes.name}
            >
              { user.firstName + ' ' + user.lastName }
              {user.isVerified && <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="15px" 
              viewBox="0 0 24 24" 
              width="15px" 
              fill="#009688"
              style={{marginLeft: 3}}>
              <circle 
                cx="12" 
                cy="12" 
                r="8" 
                fill="#ffffff"/>
              <path 
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>}
            </Typography>
            <Box component="fieldset" mb={2} borderColor="transparent" style={{padding: 0, margin: 0, position: 'relative'}}>
              <Rating 
                name="half-rating-read"
                value={rating} 
                precision={0.5} 
                readOnly 
                size="small" 
                //style={{color:'#33ab9f', }}
                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color:'#fff'}}/>}
              />
              <span className={classes.number}>({rates})</span>
            </Box>
            <Typography
              className={classes.location}
            >
              { user.town }
            </Typography>
          </div>
        </div>    
      </div>          
    </>
  );
}
 
export default PersonalInfo;