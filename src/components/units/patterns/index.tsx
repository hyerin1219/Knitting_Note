'use client';
import { Button } from '@/components/ui/button';
import PatternList from '@/components/ui/patternList';
import { usePattern } from '@/hooks/usePattern';

import Link from 'next/link';

export default function Patterns() {
    const { data } = usePattern();

    return (
        <section className="Content">
            <h2 className="Title ">Patterns</h2>

            {/* 버튼 모음 */}
            <Button className="mb-8">
                <Link href="/patterns/write">도안 작성하기</Link>
            </Button>

            <PatternList data={data} />
        </section>
    );
}
