import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const craft = searchParams.get('craft');

    const username = process.env.RAVELRY_USERNAME;
    const password = process.env.RAVELRY_PASSWORD;

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const res = await fetch(`https://api.ravelry.com/patterns/search.json?craft=${craft}&page=1&page_size=100&availability=free`, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
        // next: { revalidate: 3600 }, // 1시간 캐싱
    });

    const data = await res.json();

    return NextResponse.json(data);
}
