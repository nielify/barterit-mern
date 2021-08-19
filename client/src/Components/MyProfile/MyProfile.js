import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import PersonalInfo from './PersonalInfo';
import PostedItems from './PostedItems';

import useRequireAuth from '../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    
  }
}));

const MyProfile = ({ user, setUser }) => {
  useRequireAuth();

  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}>
      <PersonalInfo user={user} setUser={setUser} />
      <PostedItems />
    </Container>
  );
}
 
export default MyProfile;