import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const { title } = await request.json(); // 방 제목 (예: '오후의 뜨개방')

    const sdkKey = process.env.ZOOM_SDK_KEY;
    const sdkSecret = process.env.ZOOM_SDK_SECRET;

    // Video SDK는 이 토큰 자체가 방을 열고 들어가는 열쇠입니다.
    const payload = {
        iss: sdkKey, // 누가 발행했나 (내 SDK 키)
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
        tpc: title, // 세션 이름
        role_type: 1, // 방장 권한
    };

    try {
        const token = jwt.sign(payload, sdkSecret as string, { algorithm: 'HS256' });
        // jwt -> Token을 안전하게 만들고 검증해주는 도구

        // 클라이언트에게 토큰과 세션 이름을 던져줍니다.
        return NextResponse.json({
            token,
            sessionName: title,
        });
    } catch (error) {
        return NextResponse.json({ error: '토큰 생성 실패' }, { status: 500 });
    }
}
