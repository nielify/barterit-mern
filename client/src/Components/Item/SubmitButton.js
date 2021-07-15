import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  }
}));

const SubmitButton = () => {
  const classes = useStyles();

  return (  
    <Button
      color="primary"
      variant="contained"
      className={classes.root}
      fullWidth
      startIcon={<ForumIcon />}
    >
      Negotiate with Owner
    </Button>
  );
}
 
export default SubmitButton;