import React from 'react';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const { username } = useParams();
  console.log(username);
  return <div>UserProfile</div>;
};
