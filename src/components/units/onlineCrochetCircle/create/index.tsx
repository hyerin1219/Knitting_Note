'use client';
import { useRef, useState, useEffect } from 'react'; // useEffect 추가
import Link from 'next/link';
import { Plus, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OnlineCrochetCircleCreateModal from './createModal';
import { useCrochetCircle } from '@/hooks/useCrochetCircle';
import { useAlert } from '@/hooks/useAlert';
import { useUserStore } from '@/store/useUserStore';
import { useAuth } from '@/hooks/useAuth';
import Character from '@/components/ui/character';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function OnlineCrochetCircle() {
    const currentUser = useCurrentUser();

    const { showAlert, alertValue, triggerAlert } = useAlert();
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data, loading: circleLoading } = useCrochetCircle();

    // Zustand 스토어에서 데이터와 함수 가져오기
    const { users, fetchUsers, loading: userLoading } = useUserStore();

    // 컴포넌트 마운트 시 유저 정보 불러오기
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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

            <div className="flex justify-center items-start gap-5 mt-5">
                <div className="flex-1">
                    {/* 온라인 뜨개방 리스트 그리드 */}
                    {circleLoading ? (
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div key={idx} className="w-full h-20 rounded-xl border border-gray-200 bg-[#eee]" />
                            ))}
                        </div>
                    ) : (
                        <div className="">
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
                    {!circleLoading && data.length === 0 && (
                        <div className="h-145 text-center py-32 bg-white rounded-3xl border-2 border-dashed border-[var(--color02)]">
                            아직 열려있는 뜨개방이 없어요.
                            <br />첫 번째 방을 만들어보세요!
                        </div>
                    )}
                </div>

                {/* 캐릭터 정보 창 */}
                {!userLoading && currentUser && <Character currentUser={currentUser} />}
            </div>

            <OnlineCrochetCircleCreateModal currentUser={currentUser} isOpen={isOpen} setIsOpen={setIsOpen} dialogRef={dialogRef} />
        </section>
    );
}
