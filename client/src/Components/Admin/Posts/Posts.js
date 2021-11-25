import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './PostsCSS';

import { DataGrid } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useRequireAdminAuth from '../../../CustomHooks/useRequireAdminAuth';


const columns = [
  {
    field: 'image',
    headerName: 'Image',
    sortable: false,
    width: 150,
    align: 'left',
    renderCell: (params) => (
      
      <img
        style={{
          display: 'block',
          width: '80px',
          height: '80px',
        }}
        src={`${params.row.images[0]}`}
      />
    )
  },
  { field: 'id', headerName: 'ID', width: 100, hide: true },
  {
    field: 'fullName',
    headerName: 'Trader Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) => {
      return `${params.row?.userId?.firstName} ${params.row?.userId?.lastName}`
    }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 200,
    editable: false,
  },
  {
    field: 'title',
    headerName: 'Post Title',
    width: 200,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: false,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 140,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    editable: false,
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{marginRight: 3}}
        >
          View
        </Button>
        |
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{marginLeft: 3, backgroundColor: '#b2102f'}}
        >
          Delete
        </Button>
      </strong>
    ),
  }
];

const Posts = () => {
  useRequireAdminAuth();
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.allPosts);
      const renamedId = data.allPosts.map((row) => {
        const { _id, ...rest } = row;
        return { id: _id, ...rest };
      });
      setRows(renamedId);
    })
    .catch(err => console.log('an error has occured'));
  }, []);

  return (  
    <>
      <Typography variant="body2" color="primary" style={{fontSize:'1.5rem', fontWeight: 'bold', margin: '8px 0 8px 10px'}}>Users'  Posts</Typography>
      <div className={classes.datagrid}/*  style={{marginLeft: 32}} */>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          disableSelectionOnClick={false}
          disableExtendRowFullWidth={false}
          hideFooter
          //hideFooterRowCount
          //hideFooterSelectedRowCount
          /* onRowClick={(e) => {
            setSelectedRow(e.row) 
          }} */
        />
      </div>
    </>
  );
}
 
export default Posts;