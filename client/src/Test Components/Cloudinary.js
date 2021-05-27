import { useState } from 'react';

const Cloudinary = () => {
  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => { 
      setPreviewSource(reader.result);
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) {
      console.log('Select a file to upload!')
      return;
    }
    uploadImage(previewSource);
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ data: base64EncodedImage })
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (  
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          onChange={handleFileInputChange}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && 
        <img 
          src={previewSource} 
          alt='chosen file'
          style={{
          height: '300px',
          width: '300px',
          borderRadius: '50%'}} 
        />
      }
    </div>
  );
}
 
export default Cloudinary;