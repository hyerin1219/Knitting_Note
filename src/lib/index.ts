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
    { label: 'mr', value: '매직링' }, // 매직링

    { label: 'ch', value: '사슬뜨기' }, // 사슬뜨기
    { label: 'slst', value: '빼뜨기' }, // 빼뜨기
    { label: 'sc', value: '짧은뜨기' }, // 짧은뜨기
    { label: 'BLOsc', value: '이랑 짧은뜨기' }, // 이랑 짧은뜨기 (뒷고리)
    { label: 'reverseSc', value: '되돌아 짧은뜨기' }, // 되돌아 짧은뜨기 (크랩스티치)

    { label: 'dc', value: '긴뜨기' }, // 긴뜨기
    { label: 'tr', value: '한길긴뜨기' }, // 한길긴뜨기
    { label: 'dtr', value: '두길긴뜨기' }, // 두길긴뜨기
    { label: 'scInc', value: '짧은뜨기 늘림' }, // 짧은뜨기 늘림
    { label: 'dcInc', value: '긴뜨기 늘림' }, // 긴뜨기 늘림

    { label: 'dc3Inc', value: '한길긴뜨기 3코 늘림' }, // 한길긴뜨기 3코 늘림
    { label: 'shell', value: '조개무늬뜨기' }, // 조개무늬뜨기 (쉘)
    { label: 'crossDc', value: '엇걸어뜨기' }, // 엇걸어뜨기
    { label: 'dcBlo', value: '이랑 긴뜨기' }, // 이랑 긴뜨기 (뒷고리)
    { label: 'bobble5', value: '구슬뜨기' }, // 5코 구슬뜨기 (보블)

    { label: 'cluster3', value: '3코 클러스터뜨기' }, // 3코 클러스터뜨기
    { label: 'popcorn5', value: '팝콘뜨기' }, // 팝콘뜨기
    { label: 'fpSc', value: '앞걸어 짧은뜨기' }, // 앞걸어 짧은뜨기
    { label: 'bpDc', value: '뒤걸어 긴뜨기' }, // 뒤걸어 긴뜨기
    { label: 'fpDc', value: '앞걸어 긴뜨기' }, // 앞걸어 긴뜨기

    { label: 'scDec', value: '짧은뜨기 줄임' }, // 짧은뜨기 줄임
    { label: 'picot', value: '피코뜨기' }, // 피코뜨기
    { label: 'wrappedDc', value: '감아뜨기' }, // 감아뜨기 (릴리프/케이블)
    { label: 'mesh', value: '그물뜨기' }, // 그물뜨기
    { label: 'scBobble', value: '짧은뜨기 구슬뜨기' }, // 짧은뜨기 구슬뜨기
] as const;
