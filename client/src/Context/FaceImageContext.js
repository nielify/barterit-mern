import { useState, createContext } from 'react';

export const FaceImageContext = createContext();

export const FaceImageContextProvider = (props) => {
  const [ faceImage, setFaceImage ] = useState('');

  return (
    <FaceImageContext.Provider value={[faceImage, setFaceImage]}>
      { props.children }
    </FaceImageContext.Provider>
  );
}