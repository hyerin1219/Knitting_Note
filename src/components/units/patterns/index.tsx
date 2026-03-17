import Link from 'next/link';

export default function Patterns() {
    return (
        <section>
            <p>Patterns</p>

            {/* 버튼 모음 */}
            <div>
                <Link href="/patterns/write">도안 작성하기</Link>
            </div>
        </section>
    );
}
