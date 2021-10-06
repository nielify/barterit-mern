import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import useStyles from './IDScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from "../../../CustomHooks/useRequireAuth";

import Container from "@material-ui/core/Container";
import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

const IDScan = () => {
  useRequireAuth();
  const classes = useStyles();

  const webcamRef = useRef(null);

  const [noCameraModalOpen, setNoCameraModalOpen] = useState(false);

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );

  //detect if there's a camera
  useEffect(() => {
    navigator.getMedia = ( navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    navigator.getMedia({video: true}, 
      () => console.log('Camera Detected') , 
      () => setNoCameraModalOpen(true)
    );  


  }, []);

  return (  
    <Container maxWidth="lg" className={classes.root}>  
      <Webcam
        audio={false}
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
        videoConstraints={videoConstraints}
        style={{border: 'solid 1px red'}}
      />
      <h1>test title</h1>
      <button onClick={capture}>Capture photo</button>
      <NoCameraModal open={noCameraModalOpen} setOpen={setNoCameraModalOpen} />
    </Container>
  );
}

function NoCameraModal({ open, setOpen }) {
  const classes = useStyles();

  const history = useHistory();

  const handleClose = () => {
    history.push('/');
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disableEnforceFocus 
    >
      <div className={classes.paper}>
        <Typography 
          variant="h6"
          style={{textAlign: 'center'}}
          gutterBottom
        >
          Error
        </Typography>
        <Divider /> 
        <Typography
          variant="body1"
          style={{marginTop: 16, marginBottom: 16, lineHeight: '1.2rem'}}
        >
          No camera is detected in this device. You will be redirected to Marketplace
        </Typography>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to='/'
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}
 
export default IDScan;