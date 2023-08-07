import React from "react";
import { Link } from "react-router-dom";
import Likes from "./Likes";

const Post = ({ post, isCompact, isEditable }) => {
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
        {isCompact &&
        (
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
