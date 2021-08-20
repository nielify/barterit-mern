import { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  card: {
    margin:5,
  },
  cardContent: {
    padding: theme.spacing(0, 1),
  },
  title: {
    fontSize: '.9rem',
  },
  owner: {
    fontSize: '.8rem',
  },
  cardActions: {
    padding: theme.spacing(0),
  },
  bottomArea: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(.5, 1),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 4,),
  },
  question: {
    marginBottom: theme.spacing(2),
  },
  empty: {
    width: '100%',
    textAlign: 'center',
  }
}));

const Cards = ({ savedPosts, setSavedPosts, showLoader, showEmpty, setShowEmpty }) => {
  const classes = useStyles();

  const handleRemoveItem = async (key, id) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/saved-items/${id}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    const data = await res.json()
    setSavedPosts(savedPosts.filter((item,i) => i !== key));
    if (!data.savedPosts[0]) setShowEmpty(true);
  }

  return (  
    <Grid container className={classes.container}>
      { showLoader && <Loader /> }
      {showEmpty && <Typography
        className={classes.empty}
      >
        Your saved items is empty
      </Typography>}
      {savedPosts.map((item,i) => (
        <ItemCard item={item} key={i} handleRemoveItem={handleRemoveItem} index={i}/>
      ))} 
    </Grid>
  );
}
 
function ItemCard({ item, handleRemoveItem, index }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setOpen(true);
  };
  
  return (
    <>
      <Grid item xs={6} sm={4} lg={3}>
        <Card className={classes.card}>
          <CardActionArea
            component={Link}
            to={`/item/${item._id}`}
            style={{textDecoration: 'none'}}
          >
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="180"
              image={item.images[0]}
              //style={{objectFit: 'fill'}}
            />    
          </CardActionArea>
          <div className={classes.bottomArea}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" component="h3" className={classes.title}>
                { item.title }
              </Typography>
              <Typography variant="h6" component="h3" className={classes.owner}>
                Posted by: { item.owner }
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton onClick={handleDeleteModalOpen}>
                <DeleteIcon />
              </IconButton> 
            </CardActions>
          </div>
        </Card>
      </Grid>
      <DeleteConfirmationModal open={open} setOpen={setOpen} handleRemoveItem={handleRemoveItem} index={index} id={item._id}/>
    </>

  )
}

function DeleteConfirmationModal({ open, setOpen, handleRemoveItem, index, id }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus 
    >
      <div className={classes.paper}>
        <Typography 
          gutterBottom
          variant="subtitle1"
          className={classes.question}
        >
          Remove from saved items?
        </Typography>
        <Grid container>
          <Grid item xs={5}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                handleRemoveItem(index, id);
                handleClose();
              }}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

function Loader() {
  const classes = useStyles();

  return(
    <div style={{textAlign: 'center', width: '100%'}}>
      <CircularProgress 
        style={{color: '#999'}}
      />
    </div>
  )

}

export default Cards;