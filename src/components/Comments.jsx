import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.context";

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

  return (
    <div>
      <h4 className="mb-3">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-3">
          <div className="card">
            <div className="card-body">
              {editingComment && editingComment._id === comment._id ? (
                <div className="card-text">
                  <textarea
                    className="form-control"
                    placeholder="Edit comment..."
                    value={editingComment.content}
                    onChange={handleCommentChange}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={submitCommentUpdate}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <p className="card-text">{comment.content}</p>
              )}
              <p className="card-subtitle text-muted">
                By: {comment.author ? comment.author.username : "DELETED USER"} on {formatDate(comment.createdAt)}
              </p>
            </div>
            {user._id === comment.author._id && (
              <div className="card-footer d-flex justify-content-end">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
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
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => toggleEditingComment(comment)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
