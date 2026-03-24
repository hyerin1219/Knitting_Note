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
export const CrochetSymbol = [
    { value: 'mr' }, // 매직링

    { value: 'ch' }, // 사슬뜨기
    { value: 'slst' }, // 빼뜨기
    { value: 'sc' }, // 짧은뜨기
    { value: 'scBlo' }, // 이랑 짧은뜨기 (뒷고리)
    { value: 'reverseSc' }, // 되돌아 짧은뜨기 (크랩스티치)

    { value: 'dc' }, // 긴뜨기
    { value: 'tr' }, // 한길긴뜨기
    { value: 'dtr' }, // 두길긴뜨기
    { value: 'scInc' }, // 짧은뜨기 늘림
    { value: 'dcInc' }, // 긴뜨기 늘림

    { value: 'dc3Inc' }, // 한길긴뜨기 3코 늘림
    { value: 'shell' }, // 조개무늬뜨기 (쉘)
    { value: 'crossDc' }, // 엇걸어뜨기
    { value: 'dcBlo' }, // 이랑 긴뜨기 (뒷고리)
    { value: 'bobble5' }, // 5코 구슬뜨기 (보블)

    { value: 'cluster3' }, // 3코 클러스터뜨기
    { value: 'popcorn5' }, // 팝콘뜨기
    { value: 'fpSc' }, // 앞걸어 짧은뜨기
    { value: 'bpDc' }, // 뒤걸어 긴뜨기
    { value: 'fpDc' }, // 앞걸어 긴뜨기

    { value: 'scDec' }, // 짧은뜨기 줄임
    { value: 'picot' }, // 피코뜨기
    { value: 'wrappedDc' }, // 감아뜨기 (릴리프/케이블)
    { value: 'mesh' }, // 그물뜨기
    { value: 'scBobble' }, // 짧은뜨기 구슬뜨기
] as const;
