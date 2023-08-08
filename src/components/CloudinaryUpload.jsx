import React, { useState } from "react";
import axios from "axios";
import { CloudinaryContext, Image, Video } from "cloudinary-react";

const CloudinaryUpload = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const unsignedUploadPreset = import.meta.env
    .VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET;

  const [media, setMedia] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    setConfirmUpload(files.length > 0);
  };

  const uploadImage = async () => {
    if (confirmUpload && selectedFiles.length > 0) {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      formData.append("upload_preset", unsignedUploadPreset);

      console.log(`Uploading to ${cloudName} ${unsignedUploadPreset}`);
      setUploading(true);
      try {
        const res = await axios.post(url, formData);
        setMedia([...media, res.data]);
        setConfirmUpload(false);
        setSelectedFiles([]);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  const deleteMedia = async (publicId) => {
    const updatedMedia = media.filter((item) => item.public_id !== publicId);
    setMedia(updatedMedia);

    // Try to remove from Cloudinary as well
    try {
      await axios.delete('https://api.cloudinary.com/v1_1/${cloudName}/image/destroy', {
        params: {
          public_id: publicId
        }
      })
    } catch (error) {
      console.error("Error deleting media from Cloudinary:", error);
    }
  };

  return (
    <div>
      <h1>Cloudinary Upload Component</h1>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />
      {confirmUpload && (
        <>
          <button onClick={uploadImage} disabled={uploading}>
            {uploading ? "Uploading..." : "Confirm Upload"}
          </button>
          <p>Click the button above to confirm the upload.</p>
        </>
      )}
      <CloudinaryContext cloudName={cloudName}>
        {media.map((item) => (
          <div key={item.public_id} className="media-item position-relative">
            {item.resource_type === "image" ? (
              <Image publicId={item.public_id} width="300" crop="scale" />
            ) : (
              <Video
                publicId={item.public_id}
                controls
                width="300"
                crop="scale"
              />
            )}
            <button
              className="btn btn-danger btn-sm position-absolute top-0"
              onClick={() => deleteMedia(item.public_id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
      </CloudinaryContext>
    </div>
  );
};

export default CloudinaryUpload;
