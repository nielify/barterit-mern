import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    fontSize: '1.0rem',
  }
}));

const Description = () => {
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </>
  );
}
 
export default Description;