import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 999, 
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchContainer: {
    background: '#fff',
    borderRadius: '5px',
    width: '170px',
    opacity: '.8',
    fontSize: '1rem',

  },
  searchField:{
    background: '#fff',
    transition: 'width .35s',
    "&.Mui-focused": {
      width: '300px'
    }
  }
}));

const SearchBox = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      history.push('profile/search-results');
    }
  }

  return (  
    <form className={classes.root}>
      <div className={classes.searchContainer}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search user..."
          fullWidth
          InputProps={{
            className: classes.searchField,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyDown={handleSearchEnter}
        />
      </div>
    </form>
  );
}
 
export default SearchBox;