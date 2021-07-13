import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import categories from '../../others/categories';
import towns from '../../others/towns'
import { Typography } from '@material-ui/core';

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
  }
}));

const Fields = () => {
  const classes = useStyles();
  
  const [ inReturn, setInReturn ] = useState([]);
  const [ typeInReturn, setTypeInReturn ] = useState('');

  const handleDelete = (key) => {
    setInReturn((chips) => chips.filter((chip) => chip.key !== key));
  }

  const handleEnter = (e) => {
    if(e.keyCode == 13){
      if (typeInReturn !== '') {
        const item = {
          key: inReturn.length,
          label: typeInReturn,
        }
        setInReturn([...inReturn, item]);
        setTypeInReturn('');
        console.log(inReturn);
      }
    }
  }

  return (  
    <>
      <TextField 
        variant="outlined"
        size="small"
        label="Title"
        fullWidth
      />
      <FormControl variant="outlined" className={classes.select} fullWidth size="small">
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          label="Categories"
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
        fullWidth
        multiline
        rows={4}
        className={classes.description}
      />
      <FormControl variant="outlined" className={classes.select} fullWidth size="small">
        <InputLabel id="demo-simple-select-outlined-label">Location</InputLabel>
        <Select
          label="Location"
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
              <li key={data.key} style={{display: 'block'}}>
                <Chip
                  color="primary"
                  label={data.label}
                  onDelete={() => handleDelete(data.key)}
                  className={classes.chip}
                />
              </li>
            ))}
            
          </ul>
        </div>
        <TextField 
          variant="outlined"
          size="small"
          placeholder="Type the items you want in return here..."
          fullWidth
          helperText="include the amount and name of the items. eg: 1 tray of eggs" 
          className={classes.description}
          onKeyDown={handleEnter}
          onChange={(e) => setTypeInReturn(e.target.value)}
          value={typeInReturn}
        />
      </div>
    </>
  );
}
 
export default Fields;