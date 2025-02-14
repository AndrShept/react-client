import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetDungeonPartyHeroByTermQuery } from '@/lib/services/game/dungeonPartyApi';

import { SearchHeroCard } from './SearchHeroCard';
import { SearchHeroListSkeleton } from './SearchHeroListSkeleton';

interface SearchHeroListProps {
  searchTerm?: string | undefined;
}
export const SearchHeroList = ({ searchTerm }: SearchHeroListProps) => {
  const {
    data: heroData,
    isLoading,
    isError,
    isFetching,
  } = useGetDungeonPartyHeroByTermQuery(searchTerm ?? undefined);
  if (isLoading || isFetching) return <SearchHeroListSkeleton />;
  if (isError) return 'Something went wrong...';

  return (
    <ScrollArea>
      <ul className="flex flex-col gap-1 ">
        {heroData?.map((hero) => (
          <SearchHeroCard key={hero.id} hero={hero} searchTerm={searchTerm} />
        ))}
      </ul>
      {!heroData?.length && !isFetching && !isLoading && searchTerm && (
        <p className="text-muted-foreground text-xs text-center mt-10">
          hero not found
        </p>
      )}
    </ScrollArea>
  );
};
