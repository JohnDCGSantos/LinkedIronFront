import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../config";
import axios from "axios";
import Comments from "./Comments";
import Actions from "./Actions";
import { CloudinaryContext, Image, Video } from "cloudinary-react";
import { AuthContext } from "../context/Auth.context";
import UserImage from "./UserImage";

const Post = ({ post, isCompact }) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const [comments, setComments] = useState(
    isCompact ? post.comments.slice(0, 3) : post.comments
  );

  const [mainMedia, setMainMedia] = useState(
    post.media && post.media.length > 0 ? post.media[0] : null
  );
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const { user } = useContext(AuthContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleNewComment = (comment) => {
    const newComments = [comment, ...comments];
    setComments(newComments);
  };

  const handleLikeToggle = (liked) => {
    setLikes(liked ? likes + 1 : likes - 1);
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

  const canEdit = (post.author && post.author._id === user._id) || user.isAdmin;

  return (
    <section>
      <div className="card" style={{ maxWidth: "42rem" }}>
        {canEdit && (
          <div className="position-absolute end-0">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-secondary dropdown-toggle border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  color: "grey",
                  marginRight: "12px",
                }}
              >
                <i className="bi bi-three-dots"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="dropdown-item"
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Link to={`/posts/${post._id}`} className="link-unstyled" style={{width:"100%"}}>
          <div className="card-body" style={{ width: "100%" }}>
            <div
              className="d-flex mb-3 align-items-center"
              style={{ textAlign: "left" }}
            >
              <UserImage user={post.author} width="40" />
              <div className="text-dark mb-0">
                <strong style={{ paddingLeft: "5px" }}>
                  {post.author ? post.author.username : "DELETED USER"}
                </strong>
                <small
                  className="text-muted d-block"
                  style={{ marginTop: "-6px" }}
                >
                  {formatDate(post.createdAt)}
                </small>
              </div>
            </div>
            <div>
              <p>{post.content}</p>
            </div>
          </div>
        </Link>
        {mainMedia && (
          <CloudinaryContext cloudName={cloudName} style={{ width: "100%" }}>
            <div
              className="bg-image hover-overlay ripple rounded-0"
              data-mdb-ripple-color="light"
            >
              {mainMedia.split("/")[0] === "image" ? (
                <Image
                  publicId={mainMedia.split("/")[1]}
                  width="500"
                  crop="scale"
                  className="w-100"
                  alt={`Image ${1}`}
                />
              ) : (
                <Video
                  publicId={mainMedia.split("/")[1]}
                  controls
                  width="500"
                  crop="scale"
                  className="w-100"
                />
              )}
            </div>
            {post.media.length > 1 && (
              <div className="card-body">
                <div className="row">
                  {post.media.map((item, index) => {
                    const itemSplit = item.split("/");
                    const resourceType = itemSplit[0];
                    const publicId = itemSplit[1];
                    return (
                      <div className="col-md-6" key={publicId}>
                        <div
                          className="bg-image hover-overlay ripple rounded-0"
                          data-mdb-ripple-color="light"
                          onClick={() => setMainMedia(item)}
                        >
                          {resourceType === "image" ? (
                            <Image
                              publicId={publicId}
                              width="300"
                              crop="scale"
                              className="w-100"
                              alt={`Image ${index + 1}`}
                            />
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
                    );
                  })}
                </div>
              </div>
            )}
          </CloudinaryContext>
        )}
        <div
          className="card-body"
          style={{ width: "100%", padding: "0rem 1rem" }}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-hand-thumbs-up text-primary me-1"></i>
              <span className="text-muted">{likes}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-chat-dots text-primary me-1"></i>
              <span className="text-muted">{comments.length}</span>
            </div>
          </div>
        </div>

        <div
          className="card-body "
          style={{ width: "100%", padding: "0rem 1rem" }}
        >
          <Actions
            post={post}
            addComment={handleNewComment}
            likeUpdated={handleLikeToggle}
          />
          {comments.length > 0 && (
            <Comments
              comments={comments}
              onDeleteComment={deleteComment}
              onUpdateComment={editComment}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Post;
