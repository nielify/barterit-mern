import { useState, useContext } from 'react';

import PostList from './PostList';
import MarketplaceSidebar from './MarketplaceSidebar';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryModal from './CategoryModal'
import LocationModal from './LocationModal'

import Grid from '@material-ui/core/Grid';

import LoadingCover from '../LoadingCover';

import { UserContext } from '../../Context/UserContext';

const Marketplace = () => {
  const [ user, setUser ] = useContext(UserContext);

  //category modal
  const [ openCategoryModal, setOpenCategoryModal ] = useState(false); 
  //location modal
  const [ openLocationModal, setOpenLocationModal ] = useState(false);

  //postList
  const [ posts, setPosts ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [ showNote, setShowNote ] = useState(false);

  //active category
  const [ currentCategory, setCurrentCategory ] = useState('All Posts');

  return (  
    <Grid container>
      { !user._id && <LoadingCover /> }
      <MarketplaceHeader setOpenCategoryModal={setOpenCategoryModal} setOpenLocationModal={setOpenLocationModal} />
      <CategoryModal 
        open={openCategoryModal} 
        setOpen={setOpenCategoryModal} 
        setPosts={setPosts} 
        setShowLoader={setShowLoader} 
        setShowNote={setShowNote} 
        currentCategory={currentCategory} 
        setCurrentCategory={setCurrentCategory}
      />
      <LocationModal open={openLocationModal} setOpen={setOpenLocationModal} />
      <MarketplaceSidebar 
        setPosts={setPosts} 
        setShowLoader={setShowLoader} 
        setShowNote={setShowNote} 
        currentCategory={currentCategory} 
        setCurrentCategory={setCurrentCategory}
      />
      <PostList posts={posts} setPosts={setPosts} showLoader={showLoader} setShowLoader={setShowLoader} showNote={showNote} setShowNote={setShowNote} />
    </Grid>
  );
}
 
export default Marketplace;