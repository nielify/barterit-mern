import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
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

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import towns from '../../others/towns';
import SignupSelectBarangay from './SignupSelectBarangay';

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
    fontWeight: 500,
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#aaa',
  },
}));

const Signup = ({ setShowProgress }) => {
  const classes = useStyles();
  const history = useHistory();
  
  //actual registration data
  const [ lastName, setLastName ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ middleName, setMiddleName ] = useState('');
  const [ sex, setSex ] = useState(''); 
  const [ dateOfBirth, setDate ] = useState(new Date(2010, 2, 21));
  const [ town, setTown ] = useState('');
  const [ brgy, setBrgy ] = useState('');
  const [ specificAddress, setSpecificAddress ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ captcha, setCaptcha] = useState(false);
  const [ isChecked, setIsChecked] = useState(false);
  const [ isTownSelected, setIsTownSelected ] = useState(false);
  
  const isErrorRef = useRef(false);
  const [ errors, setErrors ] = useState([]);
  const [ showPassword, setShowPassword] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ submitting, setSubmitting ] = useState(false);

  //error booleans
  const [ lastNameError, setLastNameError ] = useState(false); 
  const [ firstNameError, setFirstNameError ] = useState(false); 
  const [ sexError, setSexError ] = useState(false); 
  //const [ dateError, setDateError ] = useState(false); 
  const [ townError, setTownError ] = useState(false); 
  const [ brgyError, setBrgyError ] = useState(false); 
  const [ specificAddressError, setSpecificAddressError ] = useState(false); 
  const [ emailError, setEmailError ] = useState(false); 
  const [ passwordError, setPasswordError ] = useState(false); 
  const [ confirmPasswordError, setConfirmPasswordError ] = useState(false); 
  const [ captchaError, setCaptchaError] = useState(false); 
  const [ isCheckedError, setIsCheckedError] = useState(false); 

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const siteKey = "6LcVEhkbAAAAADDdH5zfokSSOf8xYAxd-UO6k9VQ";
  const handleToken = async (token) => {
    const res = await fetch(
      'http://localhost:3001/api/recaptcha', { 
        method: 'POST', 
        headers: { 'Content-type': 'application/json' }, 
        body: JSON.stringify({ token })
      }
    );
    const data = await res.json();
    
    if (data) {
      setCaptcha(data);
      setCaptchaError(false);
      setErrors(errors.filter(error => error !== 'CAPTCHA verification is required'));
    }
    else console.log("You are not a human");
  }
  const handleExpire = () => {
    setCaptcha(false);
    setErrors(errors => [...errors, 'CAPTCHA verification is required']); 
  }

  const handleTownChange = (e) => {
    setTown(e.target.value);
    setIsTownSelected(true);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowProgress(true);

    if (submitting) {
      console.log('already submitting, wait for it to finish');
      return;
    }

    setSubmitting(true);
    setLastNameError(false);
    setFirstNameError(false);
    setSexError(false);
    setTownError(false);
    setBrgyError(false);
    setSpecificAddressError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setIsCheckedError(false);
    setCaptchaError(false);
    setErrors([]);
    isErrorRef.current = false;
    

    const formData = {
      lastName,
      firstName,
      sex,
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
    if (!isErrorRef.current) {
      const registrationData = {
        lastName,
        firstName,
        middleName,
        sex,
        dateOfBirth,
        town,
        brgy,
        specificAddress,
        email,
        password,
        confirmPassword,
      }
      
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(registrationData)
      });
      const data = await res.json();
      setShowProgress(false); //turn off the progress bar

      if (data.success) {
        history.push({
          pathname: '/signup/verify', 
          state: {
            email: data.email
          }
        });
        setSubmitting(false); //make submit button clickable again
      } else {
        if (data.email) {
          setErrors(errors => [...errors, data.email]);
          setEmailError(true);
          isErrorRef.current = true; 
          setSubmitting(false);
        }
      }

    } else {
      setShowProgress(false); //turn off the progress bar
      window.scrollTo(0, 0);
      setSubmitting(false);
    }
  }

  const validateFields = (formData) => {
    if (!formData.lastName) {
      setErrors(errors => [...errors, 'Last Name is required']);  
      setLastNameError(true);
      isErrorRef.current = true; 
    }
    if (!formData.firstName) {
      setErrors(errors => [...errors, 'First Name is required']);  
      setFirstNameError(true);
      isErrorRef.current = true; 
    }
    if (!formData.sex) {
      setErrors(errors => [...errors, 'Select your sex']);
      setSexError(true);
      isErrorRef.current = true; 
    }
    if (!formData.town) {
      setErrors(errors => [...errors, 'Select your Town']);
      setTownError(true);
      isErrorRef.current = true; 
    }
    if (!formData.brgy) {
      setErrors(errors => [...errors, 'Select your Barangay']);
      setBrgyError(true);
      isErrorRef.current = true; 
    }
    if (!formData.specificAddress) {
      setErrors(errors => [...errors, 'Specific Address is required']);
      setSpecificAddressError(true);
      isErrorRef.current = true; 
    }
    if (!formData.email) {
      setErrors(errors => [...errors, 'Email is required']);
      setEmailError(true);
      isErrorRef.current = true; 
    } else if (!emailIsValid(formData.email)) {
      setErrors(errors => [...errors, 'Email is invalid']);
      setEmailError(true);
      isErrorRef.current = true; 
    }
    if (!formData.password) {
      setErrors(errors => [...errors, 'Password is required']);
      setPasswordError(true);
      isErrorRef.current = true; 
    } else if (!passwordIsValid(formData.password)) {
      setErrors(errors => [...errors, 'Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number']);
      setPasswordError(true);
      isErrorRef.current = true; 
    }
    if (!formData.confirmPassword) {
      setErrors(errors => [...errors, 'Confirm your password']);
      setConfirmPasswordError(true);
      isErrorRef.current = true; 
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(errors => [...errors, 'Password does not match']);
      setPasswordError(true);
      setConfirmPasswordError(true);
      isErrorRef.current = true;  
    }
    if (!formData.captcha) {
      setErrors(errors => [...errors, 'CAPTCHA verification is required']);
      setCaptchaError(true);
      isErrorRef.current = true; 
    }   
    if (!formData.isChecked) {
      setErrors(errors => [...errors, 'You must agree to Terms and Condition and Privacy Policy']);
      setIsCheckedError(true);
      isErrorRef.current = true; 
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
            {errors[0] && <Alert 
              className={classes.alert}
              severity="error"
            > 
              <AlertTitle>Error Signing Up</AlertTitle>
              {errors.map((error, index) => (
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
                type="text"
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
                type="text"
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
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth className={classes.formControl} error={sexError}>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={sex}
                  onChange={e => setSex(e.target.value)}
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
                helperText="MM/DD/YYYY"
                value={dateOfBirth}
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
              <SignupSelectBarangay 
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
                type="text"
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
                type="text"
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/*<Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                error={passwordError}
                helperText="Password must contain at least 8 characters with 1 symbol, 1 lowercase letter, 1 uppercase letter, and a number"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>*/}
            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                required
              >
                <InputLabel error={passwordError}>Password</InputLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={handleShowPassword}
                        //onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error={passwordError}>Password must contain at least 8 characters with 1 special character[!@#$%^&*], 1 lowercase letter, 1 uppercase letter, and a number</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                required
              >
                <InputLabel error={confirmPasswordError}>Confirm Password</InputLabel>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
                        onClick={handleShowConfirmPassword}
                        //onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error={confirmPasswordError}>Password must contain at least 8 characters with 1 special character[!@#$%^&*], 1 lowercase letter, 1 uppercase letter, and a number</FormHelperText>
              </FormControl>
            </Grid>
            {/*<Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                error={confirmPasswordError}               
                helperText="Password must contain at least 8 characters with 1 special character[!@#$%^&*], 1 lowercase letter, 1 uppercase letter, and a number"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>*/}
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
      </Container>
    </MuiPickersUtilsProvider>
  );
}
 
export default Signup;