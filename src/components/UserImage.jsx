import React from "react";
import { CloudinaryContext, Image, Video } from "cloudinary-react";

const UserImage = ({ user, width="200" }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const defaultImageUrl = `${
    import.meta.env.BASE_URL
  }images/blank-profile-picture.png`;

  const hasCloudinaryImage = user.image.split("/").length === 2;

  return (
    <>
      {hasCloudinaryImage ? (
        <CloudinaryContext cloudName={cloudName}>
          <div className="card-img-top">
              {user.image.startsWith("image/") ? (
                <Image
                  publicId={user.image.split("/")[1]}
                  width={width}
                  height={width}
                  crop="pad"
                />
              ) : (
                <Video
                  publicId={user.image.split("/")[1]}
                  controls
                  width={width}
                  height={width}
                  crop="pad"
                />
              )}
          </div>
        </CloudinaryContext>
      ) : (
        <img src={defaultImageUrl} className="card-img-top" alt="User image" style={{width: (width+"px") }} />
      )}
    </>
  );
};
export default UserImage;
