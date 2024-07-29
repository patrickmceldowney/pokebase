import { Column, Row } from '@/types/table';

export default function SetEntity({
  row,
  column,
}: {
  row: Row;
  column: Column;
}) {
  console.log('set entity data', row[column.key]);
  return <p>Set entity</p>;
}
