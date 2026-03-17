// 바늘 타입
export const NEEDLE_TYPES = [
    { value: 'both', label: '코바늘 + 대바늘' },
    { value: 'crochet', label: '코바늘' },
    { value: 'knitting', label: '대바늘' },
] as const;

// 카테고리
export const CATEGORIES = [
    { value: 'clothing', label: '의류' },
    { value: 'bag', label: '가방' },
    { value: 'hat_gloves_socks', label: '모자/장갑/양말' },
    { value: 'scarf_shawl_blanket', label: '목도리/숄/블랭킷' },
    { value: 'doll_accessories', label: '인형/소품' },
    { value: 'other', label: '기타' },
] as const;

// 코바늘 기호
export const CrochetSymbol = {
    ch: '○', // 사슬뜨기
    sc: '×', // 짧은뜨기 (보통 +보다 × 더 많이 씀)
    hdc: 'T', // 반한길긴뜨기
    dc: 'T', // 한길긴뜨기 (표현 다르게 하고 싶으면 구분 필요)
    tr: 'T̄', // 두길긴뜨기
    inc: 'V', // 늘려뜨기
    dec: 'Λ', // 줄여뜨기
    slst: '•', // 빼뜨기
    mr: '◎', // 매직링
} as const;
