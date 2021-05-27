import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    textAlign: 'center',
    marginBottom: theme.spacing(1.5)
  },
  typography: {
    fontWeight: 'bold'
  },
  submit: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5)
  },
  link: {
    textDecoration: 'none'
  }

}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  //const [ confirmPassword, setConfirmPassword ] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      history.push('/signin');
    }
  }

  /*const verifyPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  }*/

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.typography}
        component="h1" 
        variant="h5"
        color="primary"
      >
        Sign up
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="on"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/*<TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />*/}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </form>
      <Grid container>
        <Grid item>
          <Link to="/signin" className={classes.link}>
            <Typography variant="body2" color="primary">
              Already have an account? Log in
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
 
export default Signup;