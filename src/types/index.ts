import { CATEGORIES, NEEDLE_TYPES } from '@/lib';

export type NeedleType = (typeof NEEDLE_TYPES)[number]['value'];
export type Category = (typeof CATEGORIES)[number]['value'];
