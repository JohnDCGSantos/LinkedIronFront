import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import UserImage from "./UserImage";

const UserCardFeed = ({ user }) => {
  const { logOutUser } = useContext(AuthContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="user-card-feed">
    <div className="user-card-content">
      <UserImage user={user} />
      <div className="user-details">
        <h3 className="user-name">{user.username}</h3>
        <p className="user-bootcamp">{user.bootcamp}</p>
        <p className="user-graduationDate">{formatDate(user.graduationDate)}</p>
      </div>
    </div>
  </div>
  );
};

export default UserCardFeed;
