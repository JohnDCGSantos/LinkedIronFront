import axios from "axios";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";
import { apiBaseUrl } from "../config";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { useState } from "react";

function CreatePostPage() {
  const nav = useNavigate();
  const [allMedia, setAllMedia] = useState([]);

  const submitPost = async (postData) => {
    try {
      const token = localStorage.getItem("authToken");

      const postDataWithMedia = { ...postData, media: allMedia };
      const res = await axios.post(`${apiBaseUrl}/posts`, postDataWithMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      nav(`/posts/${res.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMediaList = (updatedMedia) => {
    setAllMedia(updatedMedia);
  };

  return (
    <div>
      <h1>Create your post here</h1>
      <CloudinaryUpload initialMedia={[]} onMediaUpdated={updateMediaList} allowMultiple={true} />
      <PostForm
        onSubmit={async (postData) => {
          console.log("Creating post with data:", postData);
          await submitPost(postData);
        }}
        defaultValues={{}}
      />
    </div>
  );
}

export default CreatePostPage;
