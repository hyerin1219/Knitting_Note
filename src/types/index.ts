// 코바늘 도안 form 타입
export type IFormState = {
    title: string;
    content: string;
    category: string;
};

// ******************************* 서술 도안 type

// 코바늘 도안 타입
export type IPatternItem = {
    id: string;
    rows: string;
    text: string;
};

// 최종 도안 타입
export type IPattern = {
    id: string; // 문서 id
    author: string; // 작가 uid
    title: string;
    content: string;
    category: string;
    createdAt: string;
    items: IPatternItem[];

    completedIds: string[];
};

// ******************************* 기호 도안 type

export type IPatternImageItem = {
    id: string;
    symbols: string[];
};

export type IImagePattern = {
    id: string; // 문서 id
    author: string; // 작가 uid
    title: string;
    content: string;
    category: string;
    createdAt: string;
    items: IPatternImageItem[];

    completedIds: string[];
};
