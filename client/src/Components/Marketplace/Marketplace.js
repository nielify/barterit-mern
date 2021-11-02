import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

import Fuse from 'fuse.js';

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
  const [ showPosts, setShowPosts ] = useState(true);

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
      setShowNote(false);
      setCurrentCategory('');
      setShowPosts(false);
      setShowLoader(true);
      
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/availablePosts`, { 
          headers: { 'Content-Type': 'application/json' }, 
          credentials: 'include', 
        })
        const data = await res.json();
        
        //fuse search
        const options = {
          includeScore: true,
          useExtendedSearch: true,
          keys: [ 'title' ],
        }
        const fuse = new Fuse(data.availablePosts, options);
        const results = fuse.search(`'${searchText}`);
        const searchResult = results.map((result) => result.item);

        if (!searchResult[0]) setShowNote(true);

        setShowLoader(false);
        setPosts(searchResult);
        setShowPosts(true);
        
      } catch (err) {
        console.log(err);
        setShowLoader(false);
        alert('An error has occured! Please refresh the page.');
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
        setSearchText={setSearchText}
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
        setSearchText={setSearchText}
      />
      <PostList 
        posts={posts}
        setPosts={setPosts} 
        showLoader={showLoader} 
        setShowLoader={setShowLoader} 
        showNote={showNote} 
        setShowNote={setShowNote}
        showPosts={showPosts}
      />
        
    </Grid>
  );
}
 
export default Marketplace;