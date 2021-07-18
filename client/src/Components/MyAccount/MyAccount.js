import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import PersonalInfo from './PersonalInfo';

const useStyles = makeStyles((theme) => ({

}));

const TitleHere = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}>
      <PersonalInfo />
    </Container>
  );
}
 
export default TitleHere;