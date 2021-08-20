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

  const handleRemoveSaveClick = async () => { 
    //const res = await fetch()

    setIsSaved(false);
  }

  const handleSaveClick = async () => {
    setIsSaved(!isSaved);
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
        onClick={handleSaveClick}
      >
        { isSaved ? 'Saved' : 'Save' }
      </Button>
    </div>
    
  );
}
 
export default Buttons;