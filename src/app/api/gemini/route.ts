import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        const result = await generateObject({
            // model: google('gemini-3-flash-preview'),
            model: google('gemini-2.0-flash-exp'),
            schema: z.object({
                pattern: z.array(
                    z.object({
                        id: z.number().describe('단의 순서 (1, 2, 3...)'),
                        type: z.enum(['round', 'row']).describe('원형뜨기인지 평면뜨기인지'),
                        stitches: z.array(z.string()).describe('해당 단에 들어가는 코 기호 배열 (ch, sc, inc, dec 등)'),
                        description: z.string().describe('해당 단에 대한 텍스트 설명'),
                    }),
                ),
            }),
            system: `너는 뜨개질 전문가야. 사용자의 서술형 도안을 분석해서 기호 도안 데이터로 변환해줘. 
                     표준 기호: ch(사슬), sc(짧은뜨기), inc(늘리기), dec(줄이기), mr(매직링), sl(빼뜨기).
                     응답은 반드시 정의된 JSON 스키마 구조를 따라야 해.`,
            prompt: content,
        });

        return Response.json(result.object);
    } catch (error: any) {
        console.error('AI API 에러 발생:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
