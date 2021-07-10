import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import CardPost from './CardPost'

const useStyles = makeStyles((theme) => ({
  root: {
    //border: 'solid 1px blue',
  }
}));

const PostList = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} md={8} lg={9} className={classes.root} style={{ display: "table" }}>
      <Grid item lg={1}></Grid>
      <Grid container item lg={10}>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <CardPost />
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}
 
export default PostList;