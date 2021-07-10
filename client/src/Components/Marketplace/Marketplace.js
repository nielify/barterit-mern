import { useState } from 'react';

import Header from './Header';
import PostList from './PostList';
import MarketplaceSidebar from './MarketplaceSidebar';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryModal from './CategoryModal'

import Grid from '@material-ui/core/Grid';

const Marketplace = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(true);

  return (  
    <Grid container>
      <Header />
      <MarketplaceSidebar />
      <MarketplaceHeader setOpen={setOpenCategoryModal}/>
      <PostList />
      <CategoryModal open={openCategoryModal} setOpen={setOpenCategoryModal}/>
    </Grid>
  );
}
 
export default Marketplace;