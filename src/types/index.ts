import { CATEGORIES, NEEDLE_TYPES } from '@/lib';

export type NeedleType = (typeof NEEDLE_TYPES)[number]['value'];
export type Category = (typeof CATEGORIES)[number]['value'];

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
    // needleSize: string;
    category: Category | '';
};

// 최종 도안 타입
export type IPattern = {
    title: string;
    content: string;
    category: string;
    items: IPatternTextItem[];
};

export type IimagePattern = {
    id: number;
    stitches: string[];
};
