import React from 'react'
import { Box, Typography, Avatar, makeStyles, Divider } from '@material-ui/core'

const mockConversations = [
  {
    id: 1,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt perferendis optio eligendi labore, voluptas distinctio! Perferendis earum natus eum dignissimos.',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hi',
    created_At: new Date().toISOString()
  },
  {
    id: 1,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hello',
    created_At: new Date().toISOString()
  },
  {
    id: 2,
    members: [
      { id: 'jee', name: 'jee' },
      { id: 'yen', name: 'yen' }
    ],
    last_message: 'hi',
    created_At: new Date().toISOString()
  }
]

const mockUser = { id: 'jee', name: 'jee' }

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    overflowY: 'auto'
  },

  title: {
    textAlign: 'center',
    padding: theme.spacing(2, 0)
  },

  conversation: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    '&:hover': {
      background: theme.palette.grey[200],
      transition: 'background 0.1s ease'
    }
  },
  conversationDetails: {
    overflow: 'hidden'
  },
  name: {
    fontWeight: theme.typography.fontWeightMedium
  },
  lastMessage: {
    marginLeft: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))

const Conversations = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h6" color="textSecondary">
          Conversations
        </Typography>
      </Box>

      <Box>
        {mockConversations.map((conversation, i) => {
          const friend = conversation.members.find(
            (member) => member.id !== mockUser.id
          )
          return (
            <>
              <Box key={i} className={classes.conversation}>
                <Box mr={2}>
                  <Avatar />
                </Box>
                <Box className={classes.conversationDetails}>
                  <Typography className={classes.name}>
                    {friend.name}
                  </Typography>
                  <Typography
                    className={classes.lastMessage}
                    variant="body2"
                    color="textSecondary"
                  >
                    {conversation.last_message}
                  </Typography>
                </Box>
              </Box>
              <Divider variant="middle" />
            </>
          )
        })}
      </Box>
    </Box>
  )
}

export default Conversations
