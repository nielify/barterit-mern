import Header from './Header';
import PostList from './PostList';
import MarkpetPlaceHeader from './MarketplaceHeader';
import MarketplaceSidebar from './MarketplaceSidebar';

import Grid from '@material-ui/core/Grid';

const Marketplace = () => {
  return (  
    <Grid container>
      <Header />
      <MarketplaceSidebar />
      {/* <MarkpetPlaceHeader /> */}
      <PostList />
    </Grid>
  );
}
 
export default Marketplace;