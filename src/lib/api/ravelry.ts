export async function fetchPatternsByCraft(craft: 'crochet' | 'knitting') {
    const username = process.env.RAVELRY_USERNAME!;
    const password = process.env.RAVELRY_PASSWORD!;

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    // 무료 도안만 사용
    const url = `https://api.ravelry.com/patterns/search.json?craft=${craft}&page=1&availability=free&sort=created`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Ravelry API 요청 실패');
    }

    return res.json();
}
