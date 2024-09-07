import Table from '@/components/Table/Table';
import { TableData } from '@/types/table';

async function getData() {
  const res = await fetch(`${process.env.APP_URL}/api/pokemon/cards?limit=10`, {
    cache: 'reload',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  let tableData: TableData = {
    columns: [
      // TODO: create pokemon entity
      {
        title: 'Pokemon',
        key: 'images.small',
        component: 'image',
        componentOptions: {
          size: {
            height: 100,
            width: 100,
          },
        },
      },
      {
        title: 'Name',
        key: 'name',
        sortable: true,
      },
      {
        title: 'Set',
        key: 'set',
        component: 'set',
        sortable: true,
        sortField: 'set.name',
      },
      {
        title: 'Type',
        key: 'supertype',
        component: 'label',
      },
      {
        title: 'Types',
        key: 'types',
        component: 'label',
      },
      {
        title: 'Stage',
        key: 'subtypes',
        component: 'label',
      },
      {
        title: 'Evolves From',
        key: 'evolvesFrom',
        sortable: true,
      },
      {
        title: 'HP',
        key: 'hp',
        sortable: true,
      },
      {
        title: 'Artist',
        key: 'artist',
        sortable: true,
      },
      {
        title: 'Rarity',
        key: 'rarity',
        sortable: true,
      },
    ],
    rows: data.data || [],
    filters: [
      {
        type: 'dropdown',
        filterKey: 'set',
      },
    ],
    options: {
      pagination: false,
    },
  };
  return (
    <main className='max-h-screen p-10 overflow-hidden flex flex-col bg-white'>
      <Table tableData={tableData} />
    </main>
  );
}
