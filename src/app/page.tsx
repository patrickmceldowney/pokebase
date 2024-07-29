'use server';

import Table from '@/components/Table/Table';
import { TableData } from '@/types/table';

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  let tableData: TableData = {
    columns: [
      {
        title: 'Name',
        key: 'name',
      },
      {
        title: 'URL',
        key: 'url',
        component: 'link',
      },
    ],
    rows: data?.results || [],
  };
  const next = data?.next;
  const previous = data?.previous;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Table tableData={tableData} />
    </main>
  );
}
