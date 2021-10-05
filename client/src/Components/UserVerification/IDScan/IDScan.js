import { useCallback, useEffect, useRef } from "react";
import useStyles from './IDScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from "../../../CustomHooks/useRequireAuth";

import Container from "@material-ui/core/Container";

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

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );

  useEffect(() => {
    navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    navigator.getMedia({video: true}, 
      () => alert(`There's camera in this device`) , 
      () => alert(`There's no camera in this device`)
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
    </Container>
  );
}
 
export default IDScan;