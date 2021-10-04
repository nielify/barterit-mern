import { useCallback, useRef } from "react";
import useStyles from './IDScanCSS';
import Webcam from "react-webcam";
import useRequireAuth from "../../../CustomHooks/useRequireAuth";

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

  return (  
    <>  
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
        style={{border: 'solid 1px red'}}
      />
      <h1>test title</h1>
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
 
export default IDScan;