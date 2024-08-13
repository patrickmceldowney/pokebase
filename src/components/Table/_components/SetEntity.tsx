import { Column, Row, PokemonSet } from '@/types/table';
import Image from 'next/image';

export default function SetEntity({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) {
  const set = row[column.key] as PokemonSet;
  return (
    <div className='flex gap-5 items-center'>
      <Image
        src={set.images?.logo || set.images?.symbol || ''}
        width={64}
        height={64}
        alt={set.name || ''}
      />
      <div className='flex flex-col gap-2 justify-between'>
        <p className='font-medium'>{set.name}</p>
        <p>{set.series}</p>
      </div>
    </div>
  );
}
