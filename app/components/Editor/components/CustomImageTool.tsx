import React, { useState } from 'react';

const CustomImageTool = ({ data, onChange }) => {
  const [imageURL, setImageURL] = useState(data.file?.url || "");

  const handleReplaceImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newImageURL = reader.result;
      setImageURL(newImageURL);
      onChange({ file: { url: newImageURL } }); // Update the editor data with the new URL
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt="Selected" style={{ width: '100%' }} />
      ) : (
        <p>No image selected</p>
      )}
      <button onClick={() => document.getElementById('imageInput').click()}>
        Replace Image
      </button>
      <input
        id="imageInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleReplaceImage}
      />
    </div>
  );
};

export default CustomImageTool;
