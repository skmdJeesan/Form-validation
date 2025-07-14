import React from "react";

const UserCard = ({user}) => {
  return (
    <div className="text-white text-medium font-bold border-1 rounded-xl px-4 py-2">
      <h1>Name - {user.name}</h1>
      <h1>Email - {user.email}</h1>
      <h1>Password - {user.pass}</h1>
    </div>
  );
};

export default UserCard;
