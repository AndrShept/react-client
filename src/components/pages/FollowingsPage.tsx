import { useGetCommentsQuery } from '@/lib/services/commentApi';
import { X } from 'lucide-react';
import React, { useDeferredValue, useState, useTransition } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface props {
  name: string;
  age: number | null;
}

export const FollowingsPage = () => {
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery(
    '66263185f8ce36fa2ab5b741',
  );
  if (isLoadingComments) {
    return <p>LOADING</p>;
  }
  console.log(comments);
  return <>saddassda</>;
};
