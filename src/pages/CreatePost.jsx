import axios from "axios";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";
import { apiBaseUrl } from "../config";

function CreatePostPage() {
  const nav = useNavigate();

  const submitPost = async (postData) => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${apiBaseUrl}/posts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      nav(`/posts/${res.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create your post here</h1>

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
