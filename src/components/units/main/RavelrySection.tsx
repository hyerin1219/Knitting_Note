'use client';

import { RavelryPatternList } from '@/components/ui/ravelry/RavelryPatternList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RavelrySection() {
    return (
        <section>
            <div className="flex items-end gap-5 mb-3">
                <h2 className="text-3xl">Ravelry 최신 도안 확인하기</h2>
                <Link href="/ravelry">더보기</Link>
            </div>
            <RavelryPatternList itemCount={5} />
        </section>
    );
}
