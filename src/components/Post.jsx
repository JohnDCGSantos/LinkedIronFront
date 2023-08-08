import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../config";
import axios from "axios";
import Likes from "./Likes";
import Comments from "./Comments";
import Actions from "./Actions";

const Post = ({ post, isCompact, isEditable }) => {
  const [comments, setComments] = useState(
    isCompact ? post.comments.slice(0, 3) : post.comments
  );

  const handleNewComment = (comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
  };

  const deleteComment = async (commentId) => {
    console.log("Deleting comment:", commentId);
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(
        `${apiBaseUrl}/posts/${post._id}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mb-3">
      <img src={post.image_url} className="card-img-top" alt="Post image" />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <p className="card-text">
          <small className="text-muted">Category: {post.category}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Created at: {post.createdAt}</small>
        </p>
        <Likes />
        <div className="card-footer">
          <Actions postId={post._id} addComment={handleNewComment} />
        </div>
        {comments.length > 0 && (
          <Comments comments={comments} onDeleteComment={deleteComment} />
        )}
        {isCompact && (
          <Link to={`/posts/${post._id}`} className="btn btn-primary mr-2">
            Read more
          </Link>
        )}
        {isEditable && (
          <Link to={`/posts/${post._id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default Post;
