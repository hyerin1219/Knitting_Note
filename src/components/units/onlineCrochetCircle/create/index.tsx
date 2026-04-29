'use client';
import { Button } from '@/components/ui/button';
import { useAlert } from '@/hooks/useAlert';
import { useRef, useState } from 'react';
import OnlineCrochetCircleCreateModal from './createModal';
import { useCrochetCircle } from '@/hooks/useCrochetCircle';
import { Plus, Users, Calendar } from 'lucide-react'; // 아이콘 추가
import Link from 'next/link';

export default function OnlineCrochetCircle() {
    const { showAlert, alertValue, triggerAlert } = useAlert();
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data, loading } = useCrochetCircle();

    const handleOpenModal = () => {
        setIsOpen(true);
        dialogRef.current?.showModal();
    };

    return (
        <section className="Content ">
            {/* 상단 헤더 영역 */}
            <h2 className="Title">온라인 뜨개방</h2>
            <Button className="flex ml-auto" onClick={handleOpenModal}>
                <Plus size={20} />
                뜨개방 만들기
            </Button>

            {/* 온라인 뜨개방 리스트 그리드 */}
            {loading ? (
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                    ))}
                </div>
            ) : (
                <div className="mt-10">
                    {data.map((el) => (
                        <Link href={`/onlineCrochetCircle/${el.id}`} key={el.id} className="block bg-white p-5 rounded-2xl border-2 border-[var(--color04)] shadow-lg transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(var(--color04-rgb),0.4)] hover:-translate-y-1 group">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xl ">{el.title}</h3>
                                <div className="bg-[var(--color04)] text-white px-3 py-1 rounded-full flex items-center gap-1">
                                    <Users size={14} />
                                    {el.memberCount}명 참여 중
                                </div>
                            </div>

                            <div className="flex items-center text-xs gap-3 pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{el.createdAt}</span>
                                </div>
                                <span className="ml-auto">입장하기 →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* 데이터가 없을 때 */}
            {!loading && data.length === 0 && (
                <div className="text-center py-32 bg-white/50 rounded-[40px] border-2 border-dashed border-[var(--color02)]">
                    아직 열려있는 뜨개방이 없어요.
                    <br />첫 번째 방을 만들어보세요!
                </div>
            )}

            <OnlineCrochetCircleCreateModal isOpen={isOpen} setIsOpen={setIsOpen} dialogRef={dialogRef} />
        </section>
    );
}
