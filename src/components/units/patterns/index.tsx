'use client';
import { Button } from '@/components/ui/button';
import PatternCard from '@/components/ui/patternCard';
import { usePattern } from '@/hooks/usePattern';
// import { CATEGORIES } from '@/lib';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default function Patterns() {
    const { data } = usePattern('ALL');
    // const router = useRouter();

    return (
        <section className="Content">
            <h2 className="Title ">Patterns</h2>

            {/* 버튼 모음 */}
            <Button className="mb-8">
                <Link href="/patterns/write">도안 작성하기</Link>
            </Button>

            <PatternCard data={data} />
        </section>
    );
}
