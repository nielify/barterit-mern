import { useState } from 'react';

import Header from './Header';
import PostList from './PostList';
import MarketplaceSidebar from './MarketplaceSidebar';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryModal from './CategoryModal'
import LocationModal from './LocationModal'

import Grid from '@material-ui/core/Grid';

const Marketplace = () => {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openLocationModal, setOpenLocationModal] = useState(false);

  return (  
    <Grid container>
      <Header />
      <MarketplaceSidebar />
      <MarketplaceHeader setOpenCategoryModal={setOpenCategoryModal} setOpenLocationModal={setOpenLocationModal}/>
      <CategoryModal open={openCategoryModal} setOpen={setOpenCategoryModal}/>
      <LocationModal open={openLocationModal} setOpen={setOpenLocationModal}/>
      <PostList />
    </Grid>
  );
}
 
export default Marketplace;