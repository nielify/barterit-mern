import { useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

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

const Buttons = ({ isSaved, setIsSaved }) => {
  const classes = useStyles();
  const params = useParams();

  const [ isSubmitting, setIsSubmitting ] = useState(false);

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