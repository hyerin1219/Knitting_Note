import { CATEGORIES } from '@/lib';

// 코바늘 도안 타입
export type IPatternTextItem = {
    id: string;
    rows: string;
    text: string;
};

// 코바늘 도안 form 타입
export type IFormState = {
    title: string;
    content: string;
    category: string;
};

// 최종 도안 타입
export type IPattern = {
    id: string; // 문서 id
    author: string; // 작가 uid
    title: string;
    content: string;
    category: string;
    createdAt: string;
    items: IPatternTextItem[];
    imagePattern: IimagePattern[];
    completedIds: string[];
};

// ai 결과값 이미지 도안
export type IimagePattern = {
    id: number;
    stitches: string[];
};
