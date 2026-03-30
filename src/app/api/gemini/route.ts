// import { google } from '@ai-sdk/google';
// import { generateObject } from 'ai';
// import { z } from 'zod';

// export async function POST(req: Request) {
//     try {
//         const { content } = await req.json();

//         const result = await generateObject({
//             model: google('gemini-3-flash-preview'),
//             // model: google('gemini-2.0-flash-exp'),
//             schema: z.object({
//                 pattern: z.array(
//                     z.object({
//                         id: z.number(),
//                         type: z.enum(['round', 'row']),
//                         stitches: z.array(z.string()),
//                         description: z.string(),
//                     })
//                 ),
//             }),
//             system: `
//                     너는 코바늘 도안 변환기야.
//                     입력 데이터 구조:
//                     [
//                     { "rows": "1", "text": "짧은뜨기 6번" ,id: "firebase_id" }
//                     ]

//                     규칙:
//                     1. id 처리 (중요)
//                         - 입력으로 받은 id는 Firestore에서 생성된 고유값이다
//                         - 반드시 이 id를 결과 pattern의 id로 그대로 사용한다
//                         - 절대 새로운 id를 생성하지 않는다
//                     2. rows 처리
//                         - rows는 단 정보
//                         - "2~4" 형식이면 2,3,4 각각 별도의 객체로 생성
//                         - 각 row마다 하나의 pattern 객체 생성
//                     3. stitches 생성
//                         - text 내용을 기반으로 작업 순서를 배열로 변환
//                         - "짧은뜨기 6번" → ["sc","sc","sc","sc","sc","sc"]
//                         - 반복 횟수는 반드시 풀어서 작성
//                         - 쉼표(,) 기준으로 순서 유지
//                     4. 변환 규칙
//                         - 짧은뜨기 → sc
//                         - 짧은뜨기 늘려뜨기 → scInc
//                         - 한길긴뜨기 → dc
//                         - 한길긴뜨기 늘려뜨기 → dcInc

//                     5. type
//                         - 기본값은 "round"

//                     6. description
//                         - 입력 text 그대로 사용

//                     표준 기호:
//                     'mr','ch','slst','sc','scBlo','reverseSc','dc','tr','dtr','scInc','dcInc','dc3Inc','shell','crossDc','dcBlo','bobble5','cluster3','popcorn5','fpSc','bpDc','fpDc','scDec','picot','wrappedDc','mesh','scBobble'

//                     출력:
//                     {
//                     "pattern": [
//                         {
//                         "id": "firebase_id",
//                         "type": "round",
//                         "stitches": ["sc","sc","sc"],
//                         "description": "짧은뜨기 3번"
//                         }
//                     ]
//                     }

//                     반드시 JSON만 반환
//                     `,
//             prompt: JSON.stringify(content, null, 2),
//         });

//         return Response.json(result.object);
//     } catch (error: any) {
//         console.error('AI API 에러 발생:', error);
//         return Response.json({ error: error.message }, { status: 500 });
//     }
// }
