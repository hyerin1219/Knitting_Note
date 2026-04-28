'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useCrochetCircle, useCrochetCircleDetail } from '@/hooks/useCrochetCircle';

export default function OnlineCrochetCircleDetail() {
    const params = useParams();
    const id = params?.id as string;

    const { crochetCircle, loading } = useCrochetCircleDetail(id);

    if (!crochetCircle) return;
    return (
        <section className="Content ">
            <h2 className="Title">{crochetCircle.title}</h2>
            <div>
                <p>뜨개방 개설일 : {crochetCircle.createdAt}</p>
                <p>뜨개방 인원 : {crochetCircle.memberCount}명</p>
            </div>

            <article className="w-full">
                <div className="relative w-full h-250 border border-3 rounded bg-white overflow-hidden">
                    <img className="absolute left-1/2 top-[-50px] -translate-x-1/2 w-60" src="/images/img_lamp.png" alt="조명" />
                    <img className="absolute bottom-[-200px] w-full" src="/images/img_desk2.png" alt="책상" />
                </div>
            </article>
        </section>
    );
}
