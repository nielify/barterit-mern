import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  decoy: {
    width: '100%',
    height: 64,
  },
  root: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#f0f0f0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1, 
    marginLeft: theme.spacing(2),
  },
  brand: {
    //height: '60px',
  },
  barter: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#009688',
    marginRight: 2,
    textTransform: 'capitalize',
  },
  it: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#00897b',
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
    <>
      <div className={classes.decoy}></div>
      <AppBar className={classes.root} position="fixed">    
        <Grid container>
          <Grid item xs={12}> 
            <Toolbar className={classes.toolbar}>
              <Button
                tabIndex={-1}
                className={classes.brand}
                //startIcon={<img href="qwe.jpg" alt="BIT" />}
              >
                <Typography
                  className={classes.barter}
                  variant="h6"
                >
                  Barter
                </Typography>
                <Typography
                  className={classes.it}
                  variant="h6"
                >
                  IT
                </Typography>   
              </Button>
              
              {/*<Typography 
                variant="h5" 
                className={classes.title}
                color="primary"
              >
                <strong>BarterIT</strong>
              </Typography>*/}
              <div>
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
              </div>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </>
    
);
}
 
export default DefaultHeader;