import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../config";

const Actions = ({ postId, addComment }) => {
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

  return (
    <div className="d-flex justify-content-between align-items-center flex-column">
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary">
          <i className="bi bi-hand-thumbs-up"></i> Like
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={toggleCommentSection}
        >
          <i className="bi bi-chat-dots"></i> Comment
        </button>
        <button className="btn btn-outline-secondary">
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
