import { useEffect, useRef, useState } from 'react';
import useStyles from './ChatBoxCSS';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import SendIcon from '@material-ui/icons/Send';

const ChatBox = ({ matches, conversation, setConversation, socketRef, user, activeChat, bottomRef, scrollToBottom }) => {
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
      <div className={classes.messageBox}>
        <div className={classes.dummydivTop}></div>
        {conversation && conversation.map(message => (
          <div key={message._id} className={classes.messageContainer} style={{justifyContent: message.sender_id === user._id ? 'flex-end' : 'flex-start'}}>
            <Paper elevation={0} style={{fontSize: '.95rem'}} className={`${message.sender_id === user._id ? classes.ownMessage : classes.otherMessage}`}>
              { message.message }
            </Paper>
          </div>  
        ))}
        <div className={classes.dummydivBottom} ref={bottomRef}></div>
      </div>
      <div className={classes.inputBox}>
        <TextField
          multiline
          rowsMax={4}
          size="small"
          variant="outlined"
          placeholder="Aa"
          fullWidth
          className={classes.textField}
          onChange={handleTextChange}
          onKeyDown={handleTextEnter}
          value={text}
        />
        <IconButton size="small" style={{marginLeft: 8}} onClick={handleTextSend} >
          <SendIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
 
export default ChatBox;