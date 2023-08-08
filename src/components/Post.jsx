import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../config";
import axios from "axios";
import Likes from "./Likes";
import Comments from "./Comments";
import Actions from "./Actions";
import { CloudinaryContext, Image, Video } from "cloudinary-react";
import { Carousel } from 'react-bootstrap';

const Post = ({ post, isCompact, isEditable }) => {
  const [comments, setComments] = useState(
    isCompact ? post.comments.slice(0, 3) : post.comments
  );

  const handleNewComment = (comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
  };

  const editComment = async (updatedComment) => {
    console.log("Editing comment:", updatedComment);
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        `${apiBaseUrl}/posts/${post._id}/comment/${updatedComment._id}`,
        updatedComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedComments = comments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
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

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  return (
    <div className="card mb-3">
      {post.media.length > 0 && (
        <CloudinaryContext cloudName={cloudName}>
        <Carousel>
          {post.media.map((item) => {
            const itemSplit = item.split('/');
            const resourceType = itemSplit[0];
            const publicId = itemSplit[1];
            return (
              <Carousel.Item key={publicId}>
                <div className="media-item position-relative">
                  <div>
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
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </CloudinaryContext>
      )}
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
          <Comments
            comments={comments}
            onDeleteComment={deleteComment}
            onUpdateComment={editComment}
          />
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
