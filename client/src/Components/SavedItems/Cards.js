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

import DeleteIcon from '@material-ui/icons/Delete';

import phoneImg from '../../Images/phone-image.jpg'

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

const Cards = () => {
  const classes = useStyles();

  const [ items, setItems ] = useState([
    { title: 'itemA', owner: 'user1' },
    { title: 'itemB', owner: 'user2' },
    { title: 'itemC', owner: 'user3' },
    { title: 'itemD', owner: 'user4' },
    { title: 'itemE', owner: 'user5' },
  ]);

  const handleRemoveItem = (key) => {
    setItems(items.filter((item,i) => i !== key));
  }

  return (  
    <Grid container xs={12} className={classes.container}>
      {items.map((item,i) => (
        <ItemCard item={item} key={i} handleRemoveItem={handleRemoveItem} index={i}/>
      ))}
      {!items[0] && <Typography
        className={classes.empty}
      >
        Your saved items is empty
      </Typography>}
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
      <Grid xs={6} sm={4} lg={3}>
        <Card className={classes.card}>
          <CardActionArea
            component={Link}
            to="/item"
            style={{textDecoration: 'none'}}
          >
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="180"
              image={phoneImg}
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
      <DeleteConfirmationModal open={open} setOpen={setOpen} handleRemoveItem={handleRemoveItem} index={index}/>
    </>

  )
}

function DeleteConfirmationModal({ open, setOpen, handleRemoveItem, index }) {
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
                handleRemoveItem(index);
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

export default Cards;