import React from 'react';
import { useParams } from 'react-router-dom';

export const ConversationsPageById = () => {
  const { conversationId } = useParams();
  console.log(conversationId);
  return <div>{conversationId}</div>;
};
