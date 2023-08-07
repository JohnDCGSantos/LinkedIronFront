import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";


const Comments = ({ comments, onDeleteComment }) => {
  const { user } = useContext(AuthContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div>
      <h4 className="mb-3">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-3">
          <div className="card">
            <div className="card-body">
              <p className="card-text">{comment.content}</p>
              <p className="card-subtitle text-muted">
                By: {comment.author.username} on {formatDate(comment.createdAt)}
              </p>
            </div>
            {user._id===comment.author._id && <div className="card-footer d-flex justify-content-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDeleteComment(comment._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
