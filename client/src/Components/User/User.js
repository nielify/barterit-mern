import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PersonalInfo from './PersonalInfo';
import PostedItems from './PostedItems';

const useStyles = makeStyles((theme) => ({

}));

const User = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}>
      <PersonalInfo />
      <PostedItems />
    </Container>
  );
}
 
export default User;