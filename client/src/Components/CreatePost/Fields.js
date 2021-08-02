import { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import PostAddIcon from '@material-ui/icons/PostAdd';

import categories from '../../others/categories';
import towns from '../../others/towns'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  select: {
    marginTop: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
    marginRight: theme.spacing(1),
  },
  postButton: {
    marginTop: theme.spacing(3),
  }
}));

const Fields = ({ imageFiles, setImageError }) => {
  const classes = useStyles();

  //title state
  const [ title, setTitle ] = useState('');
  const [ titleError, setTitleError ] = useState(false); 

  //category state
  const [ category, setCategory ] = useState('');
  const [ categoryError, setCategoryError ] = useState(false); 

  //descriptions state.
  const [ description, setDescription ] = useState('');
  const [ descriptionError, setDescriptionError ] = useState(false); 

  //location state
  const [ location, setLocation ] = useState('');
  const [ locationError, setLocationError ] = useState(false); 

  //inReturn state
  const [ inReturn, setInReturn ] = useState([]);
  const [ typeInReturn, setTypeInReturn ] = useState('');
  const [ inReturnHelperText, setInReturnHelperText ] = useState('Include the amount and name of the items. eg: "1 tray of eggs"');
  const [ inReturnError, setInReturnError ] = useState(false);
  
  const postPassed = useRef(true);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryError(false);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError(false);
  }

 const handleLocationChange = (e) => {
   setLocation(e.target.value);
   setLocationError(false);
 }

  const handleDeleteChip = (key) => {
    setInReturn((chips) => chips.filter((chip) => chip.key !== key));
  }

  const handleInReturnEnter = (e) => {
    if(e.keyCode === 13){
      if (typeInReturn !== '') {
        const item = {
          key: inReturn.length,
          label: typeInReturn,
        }
        setInReturn([...inReturn, item]);
        setTypeInReturn('');
        setInReturnError(false);
      } else {
        setInReturnHelperText('Please type the item');
        setInReturnError(true);
      }
    }
  }

  const handleAddInReturnClick = () => {
    if (typeInReturn !== '') {
      const item = {
        key: inReturn.length,
        label: typeInReturn,
      }
      setInReturn([...inReturn, item]);
      setTypeInReturn('');
      setInReturnError(false);
    } else {
      setInReturnHelperText('Please type the item');
      setInReturnError(true);
    }
  } 

  const handleInReturnChange = (e) => {
    setTypeInReturn(e.target.value);
    setInReturnError(false);
    setInReturnHelperText('Include the amount and name of the items. eg: "1 tray of eggs"');
  }

  const handlePost = async () => {
    if (!imageFiles[0] || imageFiles[10]){
      setImageError(true);
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 
    if (!title) {
      setTitleError(true);
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 
    if (!category) {
      setCategoryError(true); 
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 
    if (!description) {
      setDescriptionError(true);
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 
    if (!location) {
      setLocationError(true);
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 
    if (!inReturn[0]) {
      setInReturnError(true);
      window.scrollTo(0, 0);
      postPassed.current = false;
    } 

    if (postPassed.current) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/create`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          imageFiles,
          title,
          category,
          description,
          location,
          inReturn
        })
      });
    }

    postPassed.current = true;
  }

  return (  
    <>
      <TextField 
        variant="outlined"
        size="small"
        label="Title"
        fullWidth
        error={titleError}
        onChange={handleTitleChange}
      />
      <FormControl variant="outlined" className={classes.select} fullWidth size="small" error={categoryError}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          label="Categories"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField 
        variant="outlined"
        size="small"
        label="Description"
        error={descriptionError}
        fullWidth
        multiline
        rows={4}
        className={classes.description}
        onChange={handleDescriptionChange}
      />
      <FormControl variant="outlined" className={classes.select} fullWidth size="small" error={locationError}>
        <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
        <Select
          label="Location"
          onChange={handleLocationChange}
        >
          {towns.map((towns) => (
            <MenuItem value={towns} key={towns}>{towns}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.select}>
        <div className={classes.marginLeft}> 
          <Typography>
            In return:
          </Typography>
          <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
            { inReturn.map((data) => (
              <li key={data.key} style={{display: 'inline-block'}}>
                <Chip
                  color="primary"
                  label={data.label}
                  onDelete={() => handleDeleteChip(data.key)}
                  className={classes.chip}
                />
              </li>
            ))}
            
          </ul>
        </div>
        <FormControl 
          fullWidth 
          size="small"
          className={classes.description}
        >
          <OutlinedInput
             onChange={(e) =>  handleInReturnChange(e)}
             onKeyDown={handleInReturnEnter}
             placeholder="Type the items you want in return here..."
             value={typeInReturn}
             error={inReturnError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  tabIndex={-1}
                  onClick={handleAddInReturnClick}
                >
                  <PostAddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText style={{marginLeft: 12}} error={inReturnError}>{ inReturnHelperText }</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.postButton}
          onClick={handlePost}
        >
          Post to Marketplace
        </Button>
      </div>
    </>
  );
}
 
export default Fields;