import { useEffect, useRef, useState } from 'react';
import useStyles from './ChatBoxCSS';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import SendIcon from '@material-ui/icons/Send';

const ChatBox = ({ matches, conversation, negotiation, setConversation, socketRef, user, activeChat, bottomRef, scrollToBottom }) => {
  const classes = useStyles();

  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleTextEnter = (e) => {
    if (e.keyCode === 13) e.preventDefault();
    if (e.keyCode === 13 && text.trim()) {
      e.preventDefault();
      sendMessage(text.trim());
      setText('');
    }
  }

  const handleTextSend = (e) => {
    if (text.trim()) {
      sendMessage(text.trim());
      setText('');
    }
  }

  const sendMessage = async (text) => {
    socketRef.current.emit('chat', {
      negotiation_id: activeChat, 
      sender_id: user._id, 
      message: text
    });
  }

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('chat', conversation => {
        setConversation(conversation);
        scrollToBottom('smooth');
      });
    }
  }, [socketRef.current]);

  return (  
    <div className={`${classes.root} ${matches ? classes.mobile : ''}`} >
      {negotiation && <div className={classes.infoBox}>
        <AvatarGroup max={2} style={{marginRight: 8}}>
        <Avatar src={negotiation.post.images[0] ? negotiation.post.images[0] : '' } />
        <Avatar src={user._id !== negotiation.owner._id ? negotiation.owner.profilePicture : negotiation.notOwner.profilePicture} />
        </AvatarGroup>
        <div className={classes.title}>
          <Typography variant="body1" style={{fontWeight: 'bold', fontSize: '.95rem'}}>
            { negotiation.name }
          </Typography>
          <Typography variant="subtitle2" style={{fontWeight: 'normal', fontSize: '.8rem', lineHeight: '1rem'}}>
            { user._id !== negotiation.owner._id ? `${negotiation.owner.firstName} ${negotiation.owner.lastName}` : `${negotiation.notOwner.firstName} ${negotiation.notOwner.lastName}`}
          </Typography>
        </div>
      </div>}
      {negotiation && <div className={classes.messageBox}>
        <div className={classes.dummydivTop}></div>
        {conversation && conversation.map(message => (
          <div key={message._id} className={classes.messageContainer} style={{justifyContent: message.sender_id === user._id ? 'flex-end' : 'flex-start'}}>
            <Paper elevation={0} style={{fontSize: '.95rem'}} className={`${message.sender_id === user._id ? classes.ownMessage : classes.otherMessage}`}>
              { message.message }
            </Paper>
          </div>  
        ))}
        <div className={classes.dummydivBottom} ref={bottomRef}></div>
      </div>}
      {negotiation && <div className={classes.inputBox}>
        <TextField
          multiline
          rowsMax={4}
          size="small"
          variant="outlined"
          placeholder="Aa"
          fullWidth
          className={classes.textField}
          onClick={() => scrollToBottom('smooth')}
          onChange={handleTextChange}
          onKeyDown={handleTextEnter}
          value={text}
        />
        <IconButton size="small" style={{marginLeft: 8}} onClick={handleTextSend} >
          <SendIcon color="primary" fontSize="large" />
        </IconButton>
      </div>}
      {!negotiation && <div className={classes.systemMessage}>
        <Typography
          variant="body2"
          style={{fontSize: '1rem'}}
        >
          Select a Conversation
        </Typography>
      </div>}
    </div>
  );
}
 
export default ChatBox;