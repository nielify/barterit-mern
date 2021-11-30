import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './PostsCSS';

import { DataGrid } from '@mui/x-data-grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import DeleteModal from './DeleteModal/DeleteModal';
import useRequireAdminAuth from '../../../CustomHooks/useRequireAdminAuth';

const Posts = () => {
  useRequireAdminAuth();
  const classes = useStyles();

  const [post, setPost] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

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
      headerName: 'Actions',
      width: 200,
      editable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{marginRight: 3}}
            component={Link}
            to={`/item/${params.row.id}`}
            target="_blank"
          >
            View
          </Button>
          |
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{marginLeft: 3, backgroundColor: '#b2102f'}}
            onClick={() => handleDeletePost(params.row)}
          >
            Delete
          </Button>
        </strong>
      ),
    }
  ];

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeletePost = async () => {
    setOpenDeleteModal(true);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
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
      <Typography variant="body2" color="primary" style={{fontSize:'1.5rem', fontWeight: 'bold', margin: '8px 0 8px 10px'}}>Posts</Typography>
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
          onRowClick={(e) => {
            setSelectedRow(e.row) 
          }}
        />
        {openDeleteModal && <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} post={selectedRow} setRows={setRows} />}
      </div>
    </>
  );
}
 
export default Posts;