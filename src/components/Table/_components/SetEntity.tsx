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
    <td className='w-20 h-20'>
      <Image
        src={set.images?.logo || set.images?.symbol || ''}
        width={64}
        height={64}
        alt={set.name || ''}
      />
      {/* <div className='flex-col gap-2 justify-between hidden md:flex text-sm'>
        <p className='font-medium'>{set.name}</p>
        <p>{set.series}</p>
      </div> */}
    </td>
  );
}
