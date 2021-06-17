import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f0f0f0',
  },
  toolbar: {
    paddingTop: 0,
  },
  title: {
    flexGrow: 1, 
    marginLeft: theme.spacing(2),
  },
  signin: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  signup: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    
  },
  
}));


const DefaultHeader = () => { 
  const classes = useStyles(); 

  useEffect(() => {
    
  }, [])


  return (   
    <AppBar className={classes.root} position="static">     
      <Grid container>
        <Grid item lg={1}></Grid>
        <Grid item xs={12} lg={10}> 
          <Toolbar className={classes.toolbar}>
            <Typography 
              variant="h5" 
              className={classes.title}
              color="primary"
            >
              <strong>BarterIT</strong>
            </Typography>
            <Button
              component={Link}
              to="/signin"
              color="primary"
              variant="outlined"
              className={classes.signin}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="primary"
              variant="contained"
              className={classes.signup}
            >
              Sign up
            </Button>
          </Toolbar>
        </Grid>
        
        
        <Grid item lg={1}></Grid>
      </Grid>
    </AppBar>
);
}
 
export default DefaultHeader;