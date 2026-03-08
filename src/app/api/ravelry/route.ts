import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const craft = searchParams.get('craft');

        const username = process.env.RAVELRY_USERNAME;
        const password = process.env.RAVELRY_PASSWORD;

        if (!username || !password) {
            return NextResponse.json({ error: 'Ravelry credentials not configured' }, { status: 500 });
        }

        const auth = Buffer.from(`${username}:${password}`).toString('base64');
        const craftParam = craft ? encodeURIComponent(craft) : '';

        const res = await fetch(`https://api.ravelry.com/patterns/search.json?craft=${craftParam}&page=1&page_size=100&availability=free`, {
            headers: { Authorization: `Basic ${auth}` },
            next: { revalidate: 3600 },
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Ravelry data' }, { status: 500 });
    }
}
