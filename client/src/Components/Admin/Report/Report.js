import useStyles from './ReportCSS';
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';

const Report = () => {
  useRequireAuth();
  const classes = useStyles();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/report/`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));


  }, []);

  return (  
    <Container maxWidth="lg">
      <Typography
        component="h1" 
        variant="h5" 
        color="primary" 
        style={{margin: '16px 0', fontWeight: 'bold',}}
      >
        Users Reports
      </Typography>
      <div>
        <div>
          <Typography
            variant="h6" 
          >
            Title
          </Typography>
          <Typography></Typography>
        </div>
      </div>
    </Container>
  );
}
 
export default Report;