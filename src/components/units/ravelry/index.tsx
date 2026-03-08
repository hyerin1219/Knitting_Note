'use client';

import { RavelryPatternList } from '@/components/ui/ravelry/RavelryPatternList';

export default function Ravelry() {
    return (
        <section>
            <h2 className="text-3xl mb-2">Ravelry 도안 살펴보기</h2>

            <RavelryPatternList itemCount={10} pagination />
        </section>
    );
}
