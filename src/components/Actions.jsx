import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../config";
import LikeButton from "./Likes";

const Actions = ({ postId, addComment, likeUpdated }) => {
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const toggleCommentSection = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleSubmitComment = async () => {
    console.log("Submitting comment:", comment);
    try {
      const token = localStorage.getItem("authToken");

      const newComment = await axios.post(
        `${apiBaseUrl}/posts/${postId}/comment`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addComment(newComment.data);
      setComment("");
      setIsCommentVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const postLink = `${apiBaseUrl}/posts/${postId}`;

    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      postLink
    )}`;

    window.open(linkedinShareUrl);
  };

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
      <div className="d-flex justify-content-between">
        <LikeButton postId={postId} onLike={() => likeUpdated(true)} onUnlike={() =>likeUpdated(false)} />
        <button
          className="btn btn-outline-secondary"
          onClick={toggleCommentSection}
        >
          <i className="bi bi-chat-dots"></i> Comment
        </button>
        <button className="btn btn-outline-secondary" onClick={handleShare}>
          <i className="bi bi-share"></i> Share
        </button>
      </div>
      {isCommentVisible && (
        <div className="mt-3">
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={handleSubmitComment}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;
