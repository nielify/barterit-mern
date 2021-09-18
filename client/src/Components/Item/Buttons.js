import { useState, useContext } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../../Context/UserContext';

import Button from '@material-ui/core/Button';

import ForumIcon from '@material-ui/icons/Forum';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
    marginTop: theme.spacing(3),
  }
}));

const Buttons = ({ post, isSaved, setIsSaved }) => {
  const classes = useStyles();
  const params = useParams();

  const [ user ] = useContext(UserContext);
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleNegotiateClick = () => {
    const negotiationData = {
      name: '',
      owner: {
        _id: '',
        name: '',
      },
      notOwner: {
        _id: '',
        name: '',
      },
      post: '',
    };

    negotiationData.name = `${post.title} • ${user.firstName} ${user.lastName}`;
    negotiationData.owner._id = post.userId._id;
    negotiationData.owner.name = post.userId.firstName + ' ' + post.userId.lastName;
    negotiationData.notOwner._id = user._id;
    negotiationData.notOwner.name = user.firstName + ' ' + user.lastName;
    negotiationData.post = post._id;

    console.log(negotiationData);

  }

  const handleRemoveSaveClick = async () => { 
    if (isSubmitting) return console.log('already submitting');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items/${params.id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      })
      const data = await res.json()
      setIsSaved(false);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  }

  const handleSaveClick = async () => {
    if (isSubmitting) return console.log('already submitting');
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items/${params.id}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
      })
      const data = await res.json()
      setIsSaved(true);
    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  }

  return (  
    <div className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        startIcon={<ForumIcon />}
        style={{marginRight: 16}}
        onClick={handleNegotiateClick}
      >
        Negotiate with Owner
      </Button>
      <Button
        color={ isSaved ? 'primary' : 'secondary'}
        variant="contained"
        startIcon={ isSaved ? <TurnedInIcon /> : <TurnedInNotIcon /> }
        onClick={ isSaved ? handleRemoveSaveClick : handleSaveClick }
        style={{padding: '0 30px'}}
      >
        { isSaved ? 'Saved' : 'Save' }
      </Button>
    </div>
    
  );
}
 
export default Buttons;