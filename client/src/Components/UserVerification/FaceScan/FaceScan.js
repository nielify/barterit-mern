import { makeStyles } from '@material-ui/core/styles';
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

const useStyles = makeStyles((theme) => ({

}));

const FaceScan = () => {
  useRequireAuth();
  const classes = useStyles();

  return (  
    <div></div>
  );
}
 
export default FaceScan;