import useStyles from './ChatBoxCSS';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import SendIcon from '@material-ui/icons/Send';

const mockMessages = [
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


]

const ChatBox = ({ matches }) => {
  const classes = useStyles();

  return (  
    <div className={`${classes.root} ${matches ? classes.mobile : ''}`} >
      <div className={classes.messageBox}>
        {mockMessages.map(mockMessage => (
          <div key={mockMessage._id} className={classes.messageContainer} style={{justifyContent: mockMessage.senderId === 'you' ? 'flex-end' : 'flex-start'}}>
            <Paper elevation={0} className={`${mockMessage.senderId === 'you' ? classes.ownMessage : classes.otherMessage}`}>
              { mockMessage.message }
            </Paper>
          </div>  
        ))}

         
      </div>
      <div className={classes.inputBox}>
        <TextField variant="outlined" size="small" label="Type your message..." fullWidth />
        <IconButton size="small" style={{marginLeft: 8}} >
          <SendIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
 
export default ChatBox;