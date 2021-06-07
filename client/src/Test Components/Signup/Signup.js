import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import towns from '../../others/towns';
import SelectBaranggay from './SelectBaranggay';

import ReCAPTCHA from 'react-google-recaptcha';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typography: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  submit: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5)
  },
  link: {
    textDecoration: 'none'
  },
  formControl: {
    marginTop: theme.spacing(0),
  },
  date: {
    marginTop: theme.spacing(0),
    marginBottom: 0,
  },
  checkboxLabel: {
    fontSize: '.9rem',
    lineHeight: '1.2',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  console.log('REACT_APP_ENV: ' + process.env.REACT_APP_RECAPTCHA_SITE_KEY);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  //const [ confirmPassword, setConfirmPassword ] = useState('');
 
  const [ gender, setGender ] = useState('');
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ town, setTown ] = useState('');
  const [ isTownSelected, setIsTownSelected ] = useState(false);
  const [ brgy, setBrgy ] = useState('');
  const [ isChecked, setIsChecked] = useState(false);
  const [ captcha, setCaptcha] = useState(false);

  const siteKey = "6LcVEhkbAAAAADDdH5zfokSSOf8xYAxd-UO6k9VQ";
  const handleToken = async (token) => {
    const res = await fetch(
      'http://localhost:3001/api/recaptcha', { 
        method: 'POST', 
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify({ token } )
      }
    );
    const data = await res.json();
    setCaptcha(data);
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleTownChange = (e) => {
    setTown(e.target.value);
    setIsTownSelected(true);
  }

  const handleBrgyChange = (e) => {
    setBrgy(e.target.value);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAgreeCheckbox = (e) => {
    setIsChecked(e.target.checked);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Container className={classes.container} maxWidth="md">
        <Typography className={classes.typography}
          component="h1" 
          variant="h4"
          color="primary"
        >
          Sign up to Barterit
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="Last Name"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="First Name"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                fullWidth
                label="Middle Name"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <KeyboardDatePicker
                className={classes.date}
                fullWidth
                required
                disableToolbar
                //variant="inline"
                format="MM/DD/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of Birth"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth className={classes.formControl}>
                <InputLabel>Town</InputLabel>
                <Select 
                  className={classes.select}
                  value={town}
                  onChange={handleTownChange}
                >
                  {towns.map((town) => (
                    <MenuItem value={town} key={town}>{town}</MenuItem>
                  )) 
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <SelectBaranggay 
                town={town} 
                brgy={brgy} 
                isTownSelected={isTownSelected} 
                handleBrgyChange={handleBrgyChange}
                classes={classes}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="Specific Address"
                helperText="eg: House number, Street, etc."
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/*<Grid item xs={12}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="Contact Number"
                helperText="eg: 0912*******"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>*/}
            <Grid item xs={12}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="Email"
                type="email"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                helperText="Must be composed of at least 8 characters 1 capital letter and a number"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                helperText="Must be composed of at least 8 characters 1 capital letter and a number"
                //onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleAgreeCheckbox}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="subtitle1" className={classes.checkboxLabel}>
                    I have read and accept the Terms and Conditions and Privacy Policy
                  </Typography>}
              /> 
            </Grid>
            <Grid item xs={12}>
              <ReCAPTCHA 
                sitekey={siteKey}
                onChange={handleToken}
              />
              <p>{process.env.REACT_APP_RECAPTCHA_SITE_KEY}</p>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/signin" className={classes.link}>
                <Typography variant="body2" color="primary">
                  Already have an account? Log in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
  );
}
 
export default Signup;