import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import logo from '../Images/logoreal.svg'
import { UserContext } from '../Context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 64
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
  },
  logoimage: {
    height: theme.spacing(7.2),
    width: theme.spacing(7.2),
    marginTop: -5
  },
  barter: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: '#fff',
    marginRight: 2,
    textTransform: 'capitalize',
  },
  it: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
}));

const AdminHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useContext(UserContext);

  const handleLogout = async () => { 
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/logout`, { credentials: 'include' }); 
    const data = await res.json(); 
    
    if (data.logoutSuccess) { 
      setUser({});
      history.push('/signin'); 
    } 
  } 

  return (  
    <AppBar className={classes.root} position="sticky">     
      <Grid container>
        <Grid item xs={12}> 
          <Toolbar className={classes.toolbar}>
            <Button
              tabIndex={-1}
            >
              <Avatar className={classes.logoimage} src={logo} />
              <div style={{display: 'flex'}}>
                <Typography
                  className={classes.barter}
                  variant="h6"
                  style={{letterSpacing: 1}}
                >
                  Barter
                </Typography>
                <Typography
                  className={classes.it}
                  variant="h6"
                  style={{letterSpacing: 1}}
                >
                  IT
                </Typography> 
              </div>
            </Button>

            <div >
              <Button component={Link} to="/admin/users" style={{color: 'white'}}>
                Users
              </Button>
              |
              <Button component={Link} to="/admin/reports" style={{color: 'white'}}>
                Reports
              </Button>
              |
              <Button onClick={handleLogout} style={{color: 'black'}}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}
 
export default AdminHeader;
