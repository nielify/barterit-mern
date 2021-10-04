import useStyles from './IDSelectionCSS';
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const IDSelection = () => {
  useRequireAuth();

  const classes = useStyles();

  return (  
    <Container maxWidth="sm" className={classes.root}> 
      <Typography 
        component="h1" 
        variant="h5" 
        color="primary" 
        className={classes.title}
      >
        Select your ID
      </Typography>

      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="UMID" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Driver's License" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Philhealth Card" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <ListItem button>
          <ListItemText primary="SSS ID" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Passport" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Voter's ID" />
          <KeyboardArrowRightIcon />
        </ListItem>
      </List>
      
    </Container>
  );
}
 
export default IDSelection;