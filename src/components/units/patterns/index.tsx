import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Patterns() {
    return (
        <section>
            <h2 className="text-3xl mb-8 text-center">Patterns</h2>

            {/* 버튼 모음 */}
            <Button>
                <Link href="/patterns/write">도안 작성하기</Link>
            </Button>
        </section>
    );
}
