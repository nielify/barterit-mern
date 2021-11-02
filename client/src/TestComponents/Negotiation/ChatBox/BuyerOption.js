import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  sellerOptionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderBottom: 'solid 2px #eee' 
  }
}));

const SellerOptions = () => {
  const classes = useStyles();

  return (  
    <div className={classes.sellerOptionContainer}>
      <Button
        color="primary"
        variant="contained"
        style={{width: '45%', marginRight: 24}}
        disabled
      >
        Rate User
      </Button>
      <Button
        color="primary"
        variant="outlined"
        style={{width: '45%'}}
      >
        See Post
      </Button>
    </div>
  );
}
 
export default SellerOptions;