import Badge from '@material-ui/core/Badge';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import { useEffect } from 'react';

const MessageBadge = (props) => {
  useEffect(() => {
    
  }, []);

  return (
    <Badge badgeContent={props.notifContent === false ? 0 : props.notifContent} color="error" variant="dot">
      <MessageOutlinedIcon />
    </Badge>
  );
}

export default MessageBadge;