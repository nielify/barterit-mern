import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import useStyles from './ReportCSS';
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const Report = () => {
  useRequireAuth();
  const classes = useStyles();

  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState('614c1f796ee63020b87ad09d');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/report/`, {
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      setReports(data.allReports);
    })
    .catch(err => console.log(err));
  }, []);

  const handleReportClick = (id) => {
    setActiveReport(id);
  }

  return (  
    <Container maxWidth="md">
      <Typography
        component="h1" 
        variant="h5" 
        color="primary" 
        style={{margin: '16px 0', fontWeight: 'bold',}}
      >
        Users' Reports
      </Typography>
      <div className={classes.root}>
        { reports.map(report => (
          <div className={classes.report + ' ' + `${activeReport === report._id ? classes.activeReport : ''}`} onClick={() => handleReportClick(report._id)}>
            <Typography
              variant="h6" 
            >
              { report.post.title }
            </Typography>
            <Typography
              variant="subtitle1"
              style={{lineHeight: '1.2rem', fontSize:'.9rem', marginBottom: 5}}
            >
              <i>{ report.body }</i>
            </Typography>
            <div className={classes.smallFontContainer}>
              <Typography
                className={classes.smallFont}
              >
                Sender: <Link to='#' className={classes.hover + ' ' + classes.color}>{ `${report.sender.firstName} ${report.sender.lastName}` }</Link> 
              </Typography>
              <Typography
                className={classes.smallFont}
              >
                { moment(report.createdAt).format('LLL') }
              </Typography>
              <Typography
                component={Link}
                to={`/item/${report.post._id}`}
                className={classes.smallFont + ' ' + classes.hover}
            
              >
                View Post 
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
 
export default Report;