import { useContext, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../config";
import LikeButton from "./Likes";
import UserImage from "./UserImage";
import { AuthContext } from "../context/Auth.context";

const Actions = ({ post, addComment, likeUpdated }) => {
  const { user } = useContext(AuthContext);
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
        `${apiBaseUrl}/posts/${post._id}/comment`,
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
    const postLink = `${apiBaseUrl}/posts/${post._id}`;

    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      postLink
    )}`;

    window.open(linkedinShareUrl);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center flex-column"
      style={{ padding: "10px" }}
    >
      <div className="d-flex justify-content-between">
        <LikeButton
          postId={post._id}
          onLike={() => likeUpdated(true)}
          onUnlike={() => likeUpdated(false)}
        />
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
        <div className="d-flex mt-3" style={{ width: "100%" }}>
          <UserImage user={user} width="40" />
          <div className="form-outline w-100" style={{ marginLeft: "5px" }}>
            <textarea
              className="form-control"
              rows="2"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <button
              type="button"
              className="btn btn-primary btn-sm float-end mt-2"
              onClick={handleSubmitComment}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
