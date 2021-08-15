import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    fontSize: '1.0rem',
  }
}));

const Description = ({ post }) => {
  const classes = useStyles();

  return (  
    <>
      <Typography
        variant="subtitle2"
        className={classes.title}
      >
        Description
      </Typography>
      <Typography
        variant="body2"
        style={{marginBottom:12}}
      >
        { post.description }
      </Typography>
    </>
  );
}
 
export default Description;