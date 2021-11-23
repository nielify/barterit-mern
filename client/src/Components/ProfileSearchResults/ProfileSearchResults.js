import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: '.95rem',
  },
  listItem: {
    width: '90%',
    backgroundColor: '#eed',
    borderRadius: '15px',
    padding: theme.spacing(2, 2),
    marginBottom: theme.spacing(1)
  },
  texts: {
    marginLeft: theme.spacing(1.5),
    position: 'relative',
    top: '1px'
  },
  name: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#333',
    fontSize: '.9rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    lineHeight: '1rem',
    textDecoration: 'none',
    "&:hover": {
      textDecoration: 'underline'
    }
  },
  address: {
    fontSize: '.75rem',
  }
}));

const ProfileSearchResults = () => {
  useRequireAuth();
  const classes = useStyles();
  const params = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/search/${params.name}`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  return (  
    <Container maxWidth="md" className={classes.root}>
      <Typography
        variant="body2"
        gutterBottom
        className={classes.title}
      >
        <i>Showing results for</i> <b style={{marginLeft: '1px'}}>{params.name}</b>
      </Typography>
      <List>  
        {users.map(user => (
          <UserItem user={user} key={user._id} />
        ))}
      </List>
      {/* <Loader /> */}
     
    </Container>
  );
}

const UserItem = ({ user }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <Avatar src={user.profilePicture}/>
      <div className={classes.texts}>
        <Typography variant="body2" className={classes.name} component={Link} to={`/user/${user._id}`}>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="body2" className={classes.address}>
          {`${user.town}`}
        </Typography>
      </div>
    </ListItem> 
  )
}

const Loader = () => {
  const classes = useStyles();

  return(
    <div style={{textAlign: 'center', width: '100%', marginTop: '32px'}}>
      <CircularProgress 
        style={{color: '#999'}}
      />
    </div>
  )
}
 
export default ProfileSearchResults;