import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

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
    marginBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    minWidth: 0,
  },
  typography: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  alert: {
    marginBottom: theme.spacing(3),
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
  checkboxAgree: {
    color: 'red'
  },
  captcha: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(0),
  },
  captchaErr: {
    border: 'solid 1px red',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ MiddleName, setMiddleName ] = useState('');
  const [ gender, setGender ] = useState(''); 
  const [ date, setDate ] = useState(new Date(2010, 11, 31));
  const [ town, setTown ] = useState('');
  const [ brgy, setBrgy ] = useState('');
  const [ specificAddress, setSpecificAddress ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ captcha, setCaptcha] = useState(false);
  const [ isChecked, setIsChecked] = useState(false);
  const [ isTownSelected, setIsTownSelected ] = useState(false);
  
  const isFirstRender = useRef(true);
  const errorsRef = useRef([]);
  //const [ showErrors, setShowErrors] = useState(null);

  const [ lastNameError, setLastNameError ] = useState(false);
  const [ firstNameError, setFirstNameError ] = useState(false);
  const [ genderError, setGenderError ] = useState(false); 
  //const [ dateError, setDateError ] = useState(false); 
  const [ townError, setTownError ] = useState(false);
  const [ brgyError, setBrgyError ] = useState(false);
  const [ specificAddressError, setSpecificAddressError ] = useState(false);
  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(false);
  const [ captchaError, setCaptchaError] = useState(false);
  const [ isCheckedError, setIsCheckedError] = useState(false);
 
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
  const handleExpire = () => {
    setCaptcha(false);
  }

  const handleTownChange = (e) => {
    setTown(e.target.value);
    setIsTownSelected(true);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLastNameError(false);
    setFirstNameError(false);
    setGenderError(false);
    setTownError(false);
    setBrgyError(false);
    setSpecificAddressError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setIsCheckedError(false);
    setCaptchaError(false);
    errorsRef.current = [];

    const formData = {
      lastName,
      firstName,
      gender,
      town,
      brgy,
      specificAddress,
      email,
      password,
      confirmPassword,
      captcha,
      isChecked
    }
    validateFields(formData);
    if (!errorsRef.current[0]) {
      console.log('sending data to server...');
      /*const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
       history.push('/signin');
      }*/
    } else {
      window.scrollTo(0, 0);
    }
  }

  const validateFields = (formData) => {
    if (!formData.lastName) {
      //setErrors(errors => [...errors, 'Last Name is required']);  
      setLastNameError(true);
      errorsRef.current.push('Last Name is required');  
    }
    if (!formData.firstName) {
      //setErrors(errors => [...errors, 'First Name is required']);  
      setFirstNameError(true);
      errorsRef.current.push('First Name is required');
    }
    if (!formData.gender) {
      //setErrors(errors => [...errors, 'Select your Gender']);
      setGenderError(true);
      errorsRef.current.push('Select your Gender'); 
    }
    if (!formData.town) {
      //setErrors(errors => [...errors, 'Select your Town']);
      setTownError(true);
      errorsRef.current.push('Select your Town'); 
    }
    if (!formData.brgy) {
      //setErrors(errors => [...errors, 'Select your Baranggay']);
      setBrgyError(true);
      errorsRef.current.push('Select your Baranggay'); 
    }
    if (!formData.specificAddress) {
      //setErrors(errors => [...errors, 'Specific Address is required']);
      setSpecificAddressError(true);
      errorsRef.current.push('Specific Address is required'); 
    }
    if (!formData.email) {
      //setErrors(errors => [...errors, 'Email is required']);
      setEmailError(true);
      errorsRef.current.push('Email is required'); 
    } else if (!emailIsValid(formData.email)) {
      //setErrors(errors => [...errors, 'Email is invalid']);
      setEmailError(true);
      errorsRef.current.push('Email is invalid'); 
    }
    if (!formData.password) {
      //setErrors(errors => [...errors, 'Password is required']);
      setPasswordError(true);
      errorsRef.current.push('Password is required'); 
    } else if (!passwordIsValid(formData.password)) {
      //setErrors(errors => [...errors, 'Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number']);
      setPasswordError(true);
      errorsRef.current.push('Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number'); 
    }
    if (!formData.confirmPassword) {
      //setErrors(errors => [...errors, 'Confirm your password']);
      setConfirmPasswordError(true);
      errorsRef.current.push('Confirm your password'); 
    }
    if (formData.password !== formData.confirmPassword) {
      //setErrors(errors => [...errors, 'Password does not match']);
      setPasswordError(true);
      setConfirmPasswordError(true);
      errorsRef.current.push('Password does not match'); 
    }
    if (!formData.captcha) {
      //setErrors(errors => [...errors, 'CAPTCHA verification is required']);
      setCaptchaError(true);
      errorsRef.current.push('CAPTCHA verification is required'); 
    }   
    if (!formData.isChecked) {
      //setErrors(errors => [...errors, 'You must agree to Terms and Condition and Privacy Policy']);
      setIsCheckedError(true);
      errorsRef.current.push('You must agree to Terms and Condition and Privacy Policy'); 
    }
  }

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const passwordIsValid = (password) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  useEffect(() => {
    
  }, []); 

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
          <Grid item xs={12} >
            {errorsRef.current[0] && <Alert 
              className={classes.alert}
              severity="error"
            > 
              <AlertTitle>Error Signing Up</AlertTitle>
              {errorsRef.current.map((error, index) => (
                <Typography key={index}>* {error}</Typography>
              ))}
            </Alert>}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="Last Name"
                error={lastNameError}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                required
                fullWidth
                label="First Name"
                error={firstNameError}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                //variant="outlined"
                //size="small"
                fullWidth
                label="Middle Name"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth className={classes.formControl} error={genderError}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
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
                maxDate={new Date(2010, 11, 31)}
                format="MM/DD/yyyy"
                margin="normal"
                label="Date of Birth"
                value={date}
                //error={dateError}
                onChange={date => setDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth className={classes.formControl} error={townError}>
                <InputLabel>Town</InputLabel>
                <Select 
                  className={classes.select}
                  value={town}
                  onChange={handleTownChange}
                >
                  {towns.map((town) => (
                    <MenuItem value={town} key={town}>{town}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <SelectBaranggay 
                town={town} 
                brgy={brgy} 
                isTownSelected={isTownSelected} 
                brgyError={brgyError}
                handleBrgyChange={(e) => setBrgy(e.target.value)}
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
                error={specificAddressError}
                onChange={(e) => setSpecificAddress(e.target.value)}
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
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                error={passwordError}
                helperText="Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                error={confirmPasswordError}
                helperText="Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <ReCAPTCHA 
                sitekey={siteKey}
                onChange={handleToken}
                onExpired={handleExpire}
                className={classes.captcha && captchaError ? classes.captchaErr : undefined}
              />
              <p>{process.env.REACT_APP_RECAPTCHA_SITE_KEY}</p>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                className={isCheckedError ? classes.checkboxAgree : undefined }
                control={
                  <Checkbox
                    onChange={e => setIsChecked(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="subtitle1" className={classes.checkboxLabel}>
                    I have read and accept the Terms and Conditions and Privacy Policy
                  </Typography>
                }
              /> 
            </Grid>
            <Grid item xs={12}>
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
        {/*<p>Last Name: {lastName}</p>
        <p>First Name: {firstName}</p>
        <p>Middle Name: {MiddleName}</p>
        <p>Gender: {gender}</p>
        <p>Date of Birth: {date.toString()}</p>
        <p>Town: {town}</p>
        <p>Brgy: {brgy}</p>
        <p>Address: {specificAddress}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>Confirm Password: {confirmPassword}</p>
        <p>CAPTCHA: {captcha.toString()}</p>
        <p>Terms and Condition: {isChecked.toString()}</p>*/}
        
      </Container>
    </MuiPickersUtilsProvider>
  );
}
 
export default Signup;