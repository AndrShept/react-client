import React from 'react';
import { useParams } from 'react-router-dom';

export const UserProfilePhoto = () => {
  const params = useParams();
  return <div>{JSON.stringify(params)}</div>;
};
