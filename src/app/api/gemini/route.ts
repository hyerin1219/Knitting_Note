import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        const result = await generateObject({
            model: google('gemini-3-flash-preview'),
            // model: google('gemini-2.0-flash-exp'),
            schema: z.object({
                pattern: z.array(
                    z.object({
                        id: z.number(),
                        type: z.enum(['round', 'row']),
                        stitches: z.array(z.string()),
                        description: z.string(),
                    }),
                ),
            }),
            system: `
                    너는 코바늘 도안 변환기야.
                    입력 데이터 구조:
                    [
                    { "rows": "1", "text": "짧은뜨기 6번" }
                    ]

                    규칙:
                    - rows는 단 정보 (예: "1", "2~4")
                    - 예) "2~4"는 2,3,4단으로 각각 생성
                    - text는 도안 설명
                    - stitches는 작업 순서대로 풀어서 배열로 작성

                    표준 기호:
                    ch, sc, inc, dec, mr, sl

                    예시:

                    입력:
                    [
                    { "rows": "1", "text": "짧은뜨기 3번" }
                    ]

                    출력:
                    {
                    "pattern": [
                        {
                        "id": 1,
                        "type": "round",
                        "stitches": ["sc","sc","sc"],
                        "description": "짧은뜨기 3번"
                        }
                    ]
                    }

                    반드시 JSON만 반환
                    `,
            prompt: JSON.stringify(content, null, 2),
        });

        return Response.json(result.object);
    } catch (error: any) {
        console.error('AI API 에러 발생:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
