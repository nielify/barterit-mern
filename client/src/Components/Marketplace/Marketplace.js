import { useState } from 'react';

import PostList from './PostList';
import MarketplaceSidebar from './MarketplaceSidebar';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryModal from './CategoryModal'
import LocationModal from './LocationModal'

import Grid from '@material-ui/core/Grid';

const Marketplace = () => {

  const [ openCategoryModal, setOpenCategoryModal ] = useState(false);
  const [ openLocationModal, setOpenLocationModal ] = useState(false);

  //postList
  const [ posts, setPosts ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [ showNote, setShowNote ] = useState(false);

  return (  
    <Grid container>
      <MarketplaceHeader setOpenCategoryModal={setOpenCategoryModal} setOpenLocationModal={setOpenLocationModal} />
      <CategoryModal open={openCategoryModal} setOpen={setOpenCategoryModal} setPosts={setPosts} setShowLoader={setShowLoader} setShowNote={setShowNote} />
      <LocationModal open={openLocationModal} setOpen={setOpenLocationModal} />
      <MarketplaceSidebar setPosts={setPosts} setShowLoader={setShowLoader} setShowNote={setShowNote} />
      <PostList posts={posts} setPosts={setPosts} showLoader={showLoader} setShowLoader={setShowLoader} showNote={showNote} setShowNote={setShowNote} />
    </Grid>
  );
}
 
export default Marketplace;