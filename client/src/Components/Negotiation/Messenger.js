import React from 'react'
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  TextField,
  Hidden,
  makeStyles
} from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'
import DescriptionIcon from '@material-ui/icons/Description'
import SendIcon from '@material-ui/icons/Send'
import clsx from 'clsx'
import moment from 'moment'

const mockMessages = [
  {
    id: 1,
    sender: 'yen',
    content: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    sender: 'jee',
    content: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    sender: 'yen',
    content: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    sender: 'jee',
    content: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    sender: 'yen',
    content: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    sender: 'jee',
    content: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    sender: 'yen',
    content: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    sender: 'jee',
    content: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    sender: 'yen',
    content: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    sender: 'jee',
    content: 'hi',
    created_At: new Date().toISOString()
  }
]

const mockFriend = { id: 'yen', name: 'yen' }

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    padding: theme.spacing(0, 1)
  },

  info: {
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoActions: {
    display: 'flex'
  },
  infoName: {
    display: 'flex',
    alignItems: 'center'
  },
  friendAvatar: {
    marginLeft: theme.spacing(2)
  },

  messages: {
    height: '80%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflowY: 'scroll',
    boxShadow:
      'inset 0 1px 3px 0px rgba(0, 0, 0, 0.1), inset 0 -1px 3px 0px rgba(0, 0, 0, 0.1)',
    borderRadius: 3
  },
  message: {
    marginTop: theme.spacing(1),
    maxWidth: '60%'
  },
  ownMessage: {
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  content: {
    borderRadius: 20,
    padding: theme.spacing(1, 2),
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    display: 'inline-block',
    marginBottom: theme.spacing(0.5)
  },
  ownContent: {
    background: theme.palette.grey[300],
    color: theme.palette.common.black
  },

  chatbox: {
    height: '10%',
    display: 'flex',
    alignItems: 'center'
  },
  textfield: {
    marginRight: theme.spacing(1),
    '& fieldset': {
      borderRadius: 20
    }
  }
}))

const Messenger = ({ setDrawerOpen, setModalOpen }) => {
  const classes = useStyles()

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.info}>
        <Box className={classes.infoActions}>
          <Hidden smUp>
            <IconButton onClick={handleOpenDrawer}>
              <PeopleIcon />
            </IconButton>
            <IconButton onClick={handleOpenModal}>
              <DescriptionIcon />
            </IconButton>
          </Hidden>
        </Box>
        <Box className={classes.infoName}>
          <Typography variant="h6">{mockFriend.name}</Typography>
          <Avatar className={classes.friendAvatar} />
        </Box>
      </Box>

      <Box className={classes.messages}>
        {mockMessages.map((message, i) => (
          <>
            <Box
              key={i}
              className={clsx(
                classes.message,
                message.sender !== mockFriend.id && classes.ownMessage
              )}
            >
              <Box
                className={clsx(
                  classes.content,
                  message.sender !== mockFriend.id && classes.ownContent
                )}
              >
                <Typography display="inline">{message.content}</Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {moment().calendar(message.created_At)}
              </Typography>
            </Box>
          </>
        ))}
      </Box>

      <Box className={classes.chatbox}>
        <TextField
          className={classes.textfield}
          variant="outlined"
          fullWidth
          size="small"
          label="Type a message..."
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Messenger
