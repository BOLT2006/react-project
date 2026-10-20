import React from "react";
import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const user = useLoaderData();
  return (
    <div className="profile-card">
      <h2>GitHub Profile</h2>
      <img src={user.avatar_url} alt="avatar" width={100} />
      <p>
        <strong>Username:</strong> {user.login}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
      <p>
        <strong>Followers:</strong> {user.followers}
      </p>
      <p>
        <strong>Following:</strong> {user.following}
      </p>
      <a href={user.html_url} target="_blank" rel="noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default Profile;
