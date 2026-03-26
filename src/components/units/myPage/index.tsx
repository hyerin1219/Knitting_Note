'use client';

import PatternCard from '@/components/ui/patternCard';
import { useAuth } from '@/hooks/useAuth';
import { usePattern } from '@/hooks/usePattern';

export default function Mypage() {
    const { uid } = useAuth();
    const { data: MyData } = usePattern('MINE', uid);
    const { data: SaveData } = usePattern('SAVED');

    console.log(uid);

    return (
        <section className="Content">
            <h2 className="Title">마이페이지</h2>

            <div>
                <p>내가 만든 도안</p>

                <PatternCard data={MyData} />
            </div>

            <div>
                <p>북마크 도안</p>

                <PatternCard data={SaveData} />
            </div>
        </section>
    );
}
