import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import PostList from './PostList';
import MarketplaceSidebar from './MarketplaceSidebar';
import MarketplaceHeader from './MarketplaceHeader';
import CategoryModal from './CategoryModal'
import LocationModal from './LocationModal'

import Grid from '@material-ui/core/Grid';

import { UserContext } from '../../Context/UserContext';
import useRequireAuth from '../../CustomHooks/useRequireAuth';

const Marketplace = () => {
  useRequireAuth();

  const history = useHistory();

  //app current user data
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

  //search feature mobile/desktop
  const [ searchText, setSearchText ] = useState('');

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearchEnter = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!searchText) return;
      setPosts([]);
      setShowLoader(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/search/${searchText}`, { 
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include', 
        })
        const data = await res.json();
        console.log(data.posts);
      } catch (err) {
        setShowLoader(false);
        alert('An error has occured!');
      }
    }
  }

  return (  
    <Grid container>
      <MarketplaceHeader 
        setOpenCategoryModal={setOpenCategoryModal} 
        setOpenLocationModal={setOpenLocationModal}
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
        handleSearchEnter={handleSearchEnter}
      />
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
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
        handleSearchEnter={handleSearchEnter}
      />
      <PostList posts={posts} setPosts={setPosts} showLoader={showLoader} setShowLoader={setShowLoader} showNote={showNote} setShowNote={setShowNote} />
    </Grid>
  );
}
 
export default Marketplace;