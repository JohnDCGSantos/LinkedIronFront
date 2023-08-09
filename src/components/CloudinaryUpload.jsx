import React, { useState } from "react";
import axios from "axios";
import { CloudinaryContext, Image, Video } from "cloudinary-react";

const CloudinaryUpload = ({ initialMedia, onMediaUpdated, allowMultiple }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const unsignedUploadPreset = import.meta.env
    .VITE_CLOUDINARY_UNSIGNED_UPLOAD_PRESET;

  const [media, setMedia] = useState(initialMedia || []);
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
        const dataAsString = `${res.data.resource_type}/${res.data.public_id}`;
        const updatedMedia = allowMultiple ? [...media, dataAsString] : [dataAsString];
        setMedia(updatedMedia);
        onMediaUpdated(updatedMedia);
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
    const updatedMedia = media.filter(
      (item) => item.split("/")[1] !== publicId
    );
    setMedia(updatedMedia);
    onMediaUpdated(updatedMedia);

    // Try to remove from Cloudinary as well
    try {
      await axios.delete(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          params: {
            public_id: publicId,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting media from Cloudinary:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input
          type="file"
          accept="image/*, video/*"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      {confirmUpload && (
        <>
          <button
            className="btn btn-primary"
            onClick={uploadImage}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
          <p>Click the button above to confirm the upload.</p>
        </>
      )}
      <CloudinaryContext cloudName={cloudName}>
        {allowMultiple ? (
          <div className="row">
            {media.map((item) => {
              const itemSplit = item.split('/');
              const resourceType = itemSplit[0];
              const publicId = itemSplit[1];
              return (
                <div key={publicId} className="media-item position-relative">
                  <div >
                    {resourceType === 'image' ? (
                      <Image publicId={publicId} width="300" crop="scale" />
                    ) : (
                      <Video
                        publicId={publicId}
                        controls
                        width="300"
                        crop="scale"
                      />
                    )}
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0"
                      onClick={() => deleteMedia(publicId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : media.length > 0 ? (
          <div className="row">
            <div className="media-item position-relative">
              <div>
                {media[0].startsWith("image/") ? (
                  <Image
                    publicId={media[0].split("/")[1]}
                    width="300"
                    crop="scale"
                  />
                ) : (
                  <Video
                    publicId={media[0].split("/")[1]}
                    controls
                    width="300"
                    crop="scale"
                  />
                )}
                <button
                  className="btn btn-danger btn-sm position-absolute top-0"
                  onClick={() =>
                    deleteMedia(media[0].split("/")[1])
                  }
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </CloudinaryContext>
    </div>
  );
};

export default CloudinaryUpload;