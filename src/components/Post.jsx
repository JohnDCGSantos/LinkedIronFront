import { Link } from "react-router-dom";
import Likes from "./Likes";

const Post = ({ post, isEditable }) => {
  return (
    <>
      <div>
        <img src={post.image_url} alt="Post image" style={{ width: "70px" }} />
        <h1>{post.author}</h1>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <h1>{post.category}</h1>
        <p>{post.createdAt}</p>
        <Likes />
        <Link to={`/posts/${post._id}`}>Read more</Link>
        { isEditable & <Link to={`/posts/${post._id}/edit`}>Edit</Link> }
      </div>
    </>
  );
};

export default Post;
