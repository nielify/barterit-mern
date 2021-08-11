import React, { useState } from 'react'
import {
  Grid,
  Hidden,
  Drawer,
  Box,
  Modal,
  Paper,
  Button,
  Fade,
  makeStyles
} from '@material-ui/core'
import Item from './Item'
import Conversations from './Conversations'
import Messenger from './Messenger'

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    height: '70%',
    overflowY: 'scroll'
  },
  actionsCtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.error.main,
    margin: theme.spacing(0, 2, 2, 0),
    overflowY: 'scroll'
  }
}))

const Negotiation = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Grid container>
        <Grid item md={4}>
          <Hidden smDown>
            <Conversations />
          </Hidden>
        </Grid>
        <Grid item xs={12} md={4}>
          <Messenger
            setDrawerOpen={setDrawerOpen}
            setModalOpen={setModalOpen}
          />
        </Grid>
        <Grid item md={4}>
          <Hidden smDown>
            <Item />
          </Hidden>
        </Grid>
      </Grid>

      <Hidden smUp>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box width={'70vw'}>
            <Conversations />
          </Box>
        </Drawer>
      </Hidden>

      <Hidden smUp>
        <Modal
          className={classes.modalRoot}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Fade in={modalOpen}>
            <Box className={classes.modal} component={Paper}>
              <Item />
              <Box className={classes.actionsCtn}>
                <Button color="inherit" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Hidden>
    </>
  )
}

export default Negotiation
