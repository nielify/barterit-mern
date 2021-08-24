import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import tshirtImage from '../../Images/tshirt-image.jpg'

const mockItem = {
  id: 1,
  name: 'Item Name',
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora eius similique natus aliquam laudantium et consequatur ratione alias eligendi dolor?',
  inReturn: ['1 case Redrose', '1 whole Baliwag Chicken'],
  image: tshirtImage
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2, 4),
    overflowY: 'scroll'
  },

  image: {
    width: 250,
    borderRadius: 3,
    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)'
  },

  center: {
    alignSelf: 'center'
  },

  subtitle: {
    fontWeight: theme.typography.fontWeightMedium
  },

  indent: {
    marginLeft: theme.spacing(2)
  }
}))

const Item = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.center}>
        <Typography variant="h5">{mockItem.name}</Typography>
      </Box>

      <Box className={classes.center}>
        <img className={classes.image} src={mockItem.image} alt="item" />
      </Box>

      <Box>
        <Box>
          <Typography className={classes.subtitle}>Description</Typography>
        </Box>
        <Box className={classes.indent}>
          <Typography variant="body2">{mockItem.description}</Typography>
        </Box>
      </Box>

      <Box>
        <Box>
          <Typography className={classes.subtitle}>In Return</Typography>
        </Box>
        <Box className={classes.indent}>
          <List disablePadding>
            {mockItem.inReturn.map((str, i) => (
              <ListItem key={i}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'body2' }}
                  primary={str}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Item
