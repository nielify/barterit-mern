
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    //borderRadius: 5,
    position: 'fixed',
    width: '100%'
  },
  colorPrimary: {
    backgroundColor: 'inherit'
  },
  bar: {
    borderRadius: '10',
    backgroundColor: '#26a69a',
  },
}))(LinearProgress);


const LinearLoader = ({ showProgress }) => {
  
  return (
    <div>
      {showProgress && <BorderLinearProgress />}
    </div>
  );
}
 
export default LinearLoader;