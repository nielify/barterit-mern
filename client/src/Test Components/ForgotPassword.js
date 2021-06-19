import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    display: 'inline-block',
    maxWidth: 500,
  },
  title: {
    fontWeight: 500,
  },
  paragraph: {

  },
  email: {
    margin: theme.spacing(2.3, 0),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <Paper className={classes.paper} elevation={5}>
        <Typography className={classes.title} component="h1" variant="h6">
          Forgot Password
        </Typography>
        <Typography className={classes.paragraph} variant="p">
          Please enter the email of your account that you wish to recover.
        </Typography>
        <TextField 
          className={classes.email}
          fullWidth
          variant="outlined"
          size="small"
          label="Email"
        />
        <Button
          variant="contained"
          color="primary"
          //type="submit"
        >
          Send recovery email
        </Button>
      </Paper>
    </form>
  );
}
 
export default ForgotPassword;