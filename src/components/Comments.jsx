import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import UserImage from "./UserImage";

const Comments = ({ comments, onDeleteComment, onUpdateComment }) => {
  const { user } = useContext(AuthContext);
  const [editingComment, setEditingComment] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleCommentChange = (event) => {
    const updatedComment = { ...editingComment, content: event.target.value };
    setEditingComment(updatedComment);
  };

  const toggleEditingComment = (comment) => {
    if (!editingComment) {
      setEditingComment(comment);
    } else {
      setEditingComment(null);
    }
  };

  const submitCommentUpdate = () => {
    onUpdateComment(editingComment);
    setEditingComment(null);
  };

  const canEditOrAdmin = (comment) => canEdit(comment) || user.isAdmin;
  const canEdit = (comment) =>
    comment.author && comment.author._id === user._id;

  if (!comments || comments.lenght === 0) {
    return <></>;
  }

  return (
    <div>
      <div className="d-flex align-items-start"></div>
      {comments.map((comment) => (
        <div key={comment._id} className="d-flex mb-3">
          {canEditOrAdmin(comment) && (
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
                    <button
                      className="dropdown-item"
                      onClick={() => onDeleteComment(comment._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </li>
                  {canEdit(comment) && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => toggleEditingComment(comment)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          <UserImage
            user={comment.author}
            width="40"
            className="border rounded-circle me-2"
          />
          <div style={{ width: "100%" }}>
            <div
              className="bg-light rounded-3 px-3 py-1"
              style={{ textAlign: "left" }}
            >
              <strong style={{ paddingLeft: "5px" }}>
                {comment.author ? comment.author.username : "DELETED USER"}
              </strong>
              {editingComment && editingComment._id === comment._id ? (
                <div className="form-outline w-100">
                  <textarea
                    className="form-control"
                    rows="2"
                    value={editingComment.content}
                    onChange={handleCommentChange}
                  ></textarea>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={submitCommentUpdate}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <small className="text-muted d-block">{comment.content}</small>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
