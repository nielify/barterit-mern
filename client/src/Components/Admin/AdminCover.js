import { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { AdminCoverContext } from "../../Context/AdminCoverContext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    background: '#eee',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 999999,
  }
}));

const AdminCover = () => {
  const classes = useStyles();
  const [adminCover] = useContext(AdminCoverContext);

  return (  
    <div className={classes.root} style={{display: adminCover ? 'block' : 'none'}}>
      
    </div>
  );
}
 
export default AdminCover;