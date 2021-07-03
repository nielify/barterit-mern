import Grid from '@material-ui/core/Grid';

import CardPost from './CardPost'

const PostList = () => {
  return (
    <Grid container >
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
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}
 
export default PostList;