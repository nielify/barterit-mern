import { useEffect, useState } from 'react';
import useStyles from './ChatBoxCSS';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import SendIcon from '@material-ui/icons/Send';

/* const mockMessages = [
  { 
    _id: 1,
    transactionId: 'abc123',
    senderId: 'you',
    message: 'Lorem ninja ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy ',
  },
  { 
    _id: 2,
    transactionId: 'abc123',
    senderId: 's1',
    message: 'laritas ninja est etiam processus dynamicus, qui ninja sequitur mutationem consuetudium lectorum. Mirum ninja est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem ninja ipsum modo typi,',
  },
  { 
    _id: 3,
    transactionId: 'abc123',
    senderId: 's1',
    message: 'Ut ninja wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper',
  },
  { 
    _id: 4,
    transactionId: 'abc123',
    senderId: 'you',
    message: 'suscipit ninja lobortis nisl ut aliquip ex ea commodo consequat. Duis ninja autem vel eum iriure dolor in hendrerit in vulputate ninja velit esse molestie consequat, vel illum dolore eu feugiat nulla ninja facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
  },
  { 
    _id: 5,
    transactionId: 'abc123',
    senderId: 's1',
    message: 'Nam ninja ipsum liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi ninja non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes ninja demonstraverunt lectores legere me lius quod ii legunt saepius. ',
  },


] */

const ChatBox = ({ matches, conversation, setConversation, socketRef, user, activeChat }) => {
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
      });
    }
  }, [socketRef.current]);

  return (  
    <div className={`${classes.root} ${matches ? classes.mobile : ''}`} >
      <div className={classes.messageBox}>
        <div className={classes.dummydiv}></div>
        {conversation && conversation.map(message => (
          <div key={message._id} className={classes.messageContainer} style={{justifyContent: message.sender_id === user._id ? 'flex-end' : 'flex-start'}}>
            <Paper elevation={0} style={{fontSize: '.95rem'}} className={`${message.sender_id === user._id ? classes.ownMessage : classes.otherMessage}`}>
              { message.message }
            </Paper>
          </div>  
        ))}
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