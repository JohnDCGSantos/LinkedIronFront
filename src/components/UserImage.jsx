import React from "react";
import { CloudinaryContext, Image, Video } from "cloudinary-react";
import { Link } from "react-router-dom";

const UserImage = ({ user, width = "150" }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const defaultImageUrl = `${
    import.meta.env.BASE_URL
  }images/blank-profile-picture.png`;

  const hasCloudinaryImage = user && user.image && user.image.split("/").length === 2;

  return (
    <Link className="nav-link" to={`/Profile${("/"+(user && user._id))}`}>
      {hasCloudinaryImage ? (
        <div
          className={`card-img-top  ${user.isAdmin ? "admin-border" : ""}`}
          style={{ width: width + "px" }}
        >
          <CloudinaryContext cloudName={cloudName}>
            {user.image.startsWith("image/") ? (
              <div className="image-container">
                <Image
                  publicId={user.image.split("/")[1]}
                  width={width}
                  height={width}
                  crop="thumb"
                />
              </div>
            ) : (
              <div className="video-container">
                <Video
                  publicId={user.image.split("/")[1]}
                  controls
                  width={width}
                  height={width}
                  crop="thumb"
                />
              </div>
            )}
          </CloudinaryContext>
        </div>
      ) : (
        <img
          src={defaultImageUrl}
          className="card-img-top"
          alt="User image"
          style={{ width: width + "px" }}
        />
      )}
    </Link>
  );
};
export default UserImage;
