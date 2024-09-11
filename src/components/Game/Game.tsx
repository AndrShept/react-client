import { useGetMyHeroQuery } from '@/lib/services/heroApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameNavbar } from './_components/GameNavbar';

export const Game = () => {
  const { data: hero, isLoading } = useGetMyHeroQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (!hero) {
      navigate('/create-hero');
    }
  }, []);
  return (
    <section className="flex flex-col ">
      <GameNavbar />
    </section>
  );
};
