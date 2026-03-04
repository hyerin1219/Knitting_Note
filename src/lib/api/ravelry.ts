export async function fetchPatternsByCraft(craft: 'crochet' | 'knitting') {
    const username = process.env.RAVELRY_USERNAME;
    const password = process.env.RAVELRY_PASSWORD;

    if (!username || !password) {
        throw new Error('API 자격 증명이 설정되지 않았습니다.');
    }

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const url = `https://api.ravelry.com/patterns/search.json?craft=${craft}&page=1&page_size=100&availability=free&sort=created`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
        // '최신순' 정렬이므로 no-store
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Ravelry API 요청 실패: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.patterns || [];
}
