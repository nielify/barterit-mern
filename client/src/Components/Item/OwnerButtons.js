import { useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',  
    marginTop: theme.spacing(3),
  }
}));

const OwnerButtons = () => {
  const classes = useStyles();
  
  return (  
    <div className={classes.root}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        startIcon={<EditIcon />}
        style={{marginRight: 16}}
      >
        Edit Post
      </Button>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        startIcon={ <DeleteIcon /> }
        //onClick={  }
        style={{padding: '0 30px'}}
      >
        Delete
      </Button>
    </div>
    
  );
}
 
export default OwnerButtons;