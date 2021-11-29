import { useState, useCallback, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom';
import useStyles from './FaceScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from '../../../CustomHooks/useRequireAuth';

import { UserContext } from "../../../Context/UserContext";
import { IDImageContext } from "../../../Context/IDImageContext";
import { FaceImageContext } from '../../../Context/FaceImageContext';

import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CameraIcon from '@material-ui/icons/Camera';

const WebcamComponent = () => <Webcam />;

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  facingMode: FACING_MODE_USER
};

const FaceScan = () => {
  useRequireAuth();
  const classes = useStyles();

  //refresh
  const [refresh, setRefresh] = useState(false);

  //loader
  const [loader, setLoader] = useState(false);

  const handleProceed = async () => {
    setLoader(true);

    const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/user/verify-account/${user._id}`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
      body: JSON.stringify({
        idImage,
        faceImage
      })
    })

    const data = await res.json();
    console.log(data);

    setLoader(false);
    setSuccessModal(true);
  }

  //modal
  const [successModal, setSuccessModal] = useState(false);

  //window height
  const widthRef = useRef(window.innerWidth);
  const [width, setWidth] = useState(widthRef.current);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    
    return () => {
      window.removeEventListener('resize', () => {});
    }
  },[width]);

  const webcamRef = useRef(null);
  //const [image, setImage] = useState('');
  const [user] = useContext(UserContext);
  const [idImage, setIdImage] = useContext(IDImageContext);
  const [faceImage, setFaceImage] = useContext(FaceImageContext);

  const [noCameraModalOpen, setNoCameraModalOpen] = useState(false);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot(/* {width: 1280, height: 720} */);
      setFaceImage(imageSrc);
    },
    [webcamRef]
  );

  const handleRetake = () => {
    setFaceImage('');
  }

  const switchCamera = () => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }

  useEffect(() => {
    //for initializing and detecting camera
    navigator.getMedia = ( navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    navigator.getMedia({video: true}, 
      () => {
        setTimeout(() => {
          setRefresh(!refresh);
        }, 500)
      } , 
      () => {
        setTimeout(() => {
          setNoCameraModalOpen(true);
        }, 500);
      }
    );  
  }, [refresh]);

  return (  
    <Container maxWidth="md" className={classes.root}> 
      { facingMode == 'user' && faceImage == '' &&
        <div
          style={{
            width: width * .8,
            height: width * .8,
            maxWidth: 420,
            maxHeight: 420,
            marginTop: 32,
            marginBottom: 50,
            overflow: 'hidden',
            border: 'solid 5px #009688',
            borderRadius: '50%',
          }}
        >
          <Webcam
            forceScreenshotSourceSize={true}
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
            }}
          />
        </div>
      }

      {/* {facingMode !== 'user' && <div style={{width: width * .8, height: width * .8, maxWidth: 420, maxHeight: 420, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 160, marginTop: 32,}}>
        <Typography
          variant="subtitle2"
        >
          Preparing camera...
        </Typography>  
      </div>} */}

      {faceImage != '' && /* facingMode === 'environment' && */
        <div 
          className={classes.capturedImageContainer} 
          style={{ width: width * .8, height: width * .8, }}
        >
          <img 
            src={faceImage} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
            }} 
          /> 
        </div>
      }

      {<div style={{textAlign:'center', marginBottom: 16}}>
        <Typography variant="subtitle2">
        Take a selfie 
        </Typography>
        <Typography variant="subtitle2" style={{fontWeight: 'normal'}}>
          Make sure it visibly shows your face and the shot is clear and not blurred.
        </Typography>
      </div>}

      {faceImage == '' && <IconButton onClick={capture} style={{background: 'rgb(0, 0, 0, .15)'}}> 
        <CameraIcon fontSize="large" style={{color: '#009688'}} />      
      </IconButton>}

      {faceImage != '' && <div
        style={{
          width:'100%', 
          display:'flex',
          justifyContent:'center',
          marginTop:16
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{marginRight:32, width:'30%',}}
          onClick={handleRetake}
        >
          Retake
        </Button>
        <Button
          variant="contained"
          color="primary"
          /* component={Link}
          to='/user-verification/face-scan' */
          onClick={handleProceed}
          style={{
            width:'30%',
          }}
        >
          Proceed
        </Button>
      </div>}

      {loader && <Loader />}
      {successModal && <SuccessModal open={successModal} setOpen={setSuccessModal} />}
    </Container>
  );
}
 
function Loader() {
  const classes = useStyles();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'black',
      position: 'absolute',
      opacity: .7,
      top: 0,
      left: 0,
      zIndex: '9999',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress 
         style={{color: '#999', marginTop: '-5%'}}
      />
    </div>
  );
}

function SuccessModal({ open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => {
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
            Verification request sent
          </Typography>
          <Divider /> 
          <Typography
            variant="subtitle1"
            style={{marginTop: 16, marginBottom: 16, fontSize: '.9rem', lineHeight: '1.4rem'}}
          > 
            You have sent a request for the validation of your account. BarterIT admin is now reviewing your request. <br/><br/>
            Once your request is approved, you will have a green checkmark appear beside your name on your profile.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to='/profile'
              onClick={() => {
                handleClose();
              }}
            >
              Done
            </Button>
          </div>
        </div>
    </Modal>
  )
}

export default FaceScan;