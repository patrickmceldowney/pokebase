import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const url = process.env.API_URL || '';
    const path = params?.slug ? params.slug.join('/') : '';
    const searchParams = req.nextUrl.searchParams;
    // limit
    const limit = searchParams.get('limit') || 10;
    const page = searchParams.get('page') || 1;
    const res = await fetch(`${url}/${path}?pageSize=${limit}&page=${page}`, {
      headers: {
        'X-Api-Key': process.env.API_KEY!,
        'Content-Type': 'application/json',
      },
    });
    console.log('fetching data');

    const data = await res.json();

    return Response.json(data);
  } catch (e) {
    console.error('Error fetching data', e);
    return Response.error();
  }
}
