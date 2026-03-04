export interface IRavelry {}

// 디자이너 정보
interface IDesigner {
    id: number;
    name: string;
    crochet_pattern_count: number;
    knitting_pattern_count: number;
    favorites_count: number;
}

// 사진 정보
interface IPhoto {
    id: number;
    aspect_ratio: number;
    medium_url: string;
    medium2_url: string;
    small_url: string;
    small2_url: string;
    square_url: string;
    thumbnail_url: string;
    sort_order: number;
    x_offset: number;
    y_offset: number;
    caption: string | null;
    caption_html: string | null;
    copyright_holder: string | null;
    user_id: number;
}

// 패턴 데이터
interface IRavelryPattern {
    id: number;
    name: string;
    permalink: string;
    free: boolean;
    designer: IDesigner;
    first_photo: IPhoto;
    personal_attributes: any | null; // 현재 데이터상 null이므로 유동적
    // 가상 속성 (API 데이터에 따라 추가 가능)
    pattern_author?: any;
    pattern_sources?: any;
}

// 전체 응답 타입 (100개 배열)
type PatternList = IRavelryPattern[];
