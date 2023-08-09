import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../config";
import { CloudinaryContext, Image, Video } from "cloudinary-react";
import CloudinaryUpload from "./CloudinaryUpload";

const UserCard = ({ user }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { logOutUser, updateUser } = useContext(AuthContext);
  const defaultImageUrl = `${
    import.meta.env.BASE_URL
  }images/blank-profile-picture.png`;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    bootcamp: user.bootcamp,
    graduationDate: user.graduationDate,
    image: user.image,
  });
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser({
      username: user.username,
      email: user.email,
      bootcamp: user.bootcamp,
      graduationDate: user.graduationDate,
      image: user.image,
    });
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    await handleUpdate();
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log(editedUser);
      const tokenInStorage = localStorage.getItem("authToken");
      const request = await axios.put(`${apiBaseUrl}/users/`, editedUser, {
        headers: {
          Authorization: `Bearer ${tokenInStorage}`,
        },
      });
      updateUser(request.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const tokenInStorage = localStorage.getItem("authToken");
      setIsLoading(true);
      await axios.delete(`${apiBaseUrl}/users/`, {
        headers: {
          Authorization: `Bearer ${tokenInStorage}`,
        },
      });
      setIsLoading(false);
      logOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasCloudinaryImage = user.image.split("/").length === 2;

  return (
    <div className="card">
       {isEditing ? (
        <CloudinaryUpload
          allowMultiple={false}
          initialMedia={hasCloudinaryImage ? [user.image] : []}
          onMediaUpdated={(updatedMedia) =>
            setEditedUser((prevUser) => ({
              ...prevUser,
              image: updatedMedia[0] ? updatedMedia[0] : "",
            }))
          }
        />
      ) : hasCloudinaryImage ? (
        <CloudinaryContext cloudName={cloudName}>
          <div className="media-item position-relative">
            <div>
              {user.image.startsWith("image/") ? (
                <Image
                  publicId={user.image.split("/")[1]}
                  width="300"
                  crop="scale"
                />
              ) : (
                <Video
                  publicId={user.image.split("/")[1]}
                  controls
                  width="300"
                  crop="scale"
                />
              )}
            </div>
          </div>
        </CloudinaryContext>
      ) : (
        <img src={defaultImageUrl} className="card-img-top" alt="User image" />
      )} 
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bootcamp"
              value={editedUser.bootcamp}
              onChange={handleChange}
            />
            <input
              type="text"
              name="graduationDate"
              value={editedUser.graduationDate}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <h3 className="user-name">{user.username}</h3>
            <p className="user-email">{user.email}</p>
            <p className="user-bootcamp">{user.bootcamp}</p>
            <p className="user-graduationDate">{user.graduationDate}</p>
          </>
        )}
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <br />
            <br />
            <button onClick={handleDelete}>Delete my account</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
