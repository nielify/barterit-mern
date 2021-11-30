import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  datagrid: {
    height: '91vh',
    width: '1000px',
  },
}));

export default useStyles;