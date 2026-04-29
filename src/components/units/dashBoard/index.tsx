'use client';

import { SetStateAction, useState } from 'react';
import { CHARACTER } from '@/lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashBoard() {
    const [selectedChar, setSelectedChar] = useState<SetStateAction<string>>(CHARACTER[0]?.value);
    const [nickName, setNickName] = useState('');

    return (
        <section className="Content ">
            <h2 className="Title ">캐릭터 설정하기</h2>

            <div className="w-full h-full flex flex-col justify-center ">
                <div className="flex flex-wrap justify-center gap-5">
                    {CHARACTER.map((el) => {
                        const isSelected = selectedChar === el.value;

                        return (
                            <div
                                role="button"
                                key={el.value}
                                onClick={() => setSelectedChar(el.value)}
                                className={` relative flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer
                                ${isSelected ? 'bg-white shadow-md ring-2 ring-[var(--color04)] scale-105' : 'hover:bg-gray-100 grayscale-[1] hover:grayscale-0'}`}
                            >
                                {/* 캐릭터 이미지 */}
                                <div className="w-20 h-20 mb-2">
                                    <img className="w-full h-full object-contain" src={`/images/char/char_${el.value}.png`} alt={el.label} />
                                </div>

                                {/* 캐릭터 이름  */}
                                <span className={`text-xs font-medium ${isSelected ? 'text-[var(--color04)]' : 'text-gray-500'}`}>{el.label}</span>

                                {/* 선택 표시 체크 아이콘 (옵션) */}
                                {isSelected && (
                                    <div className="absolute -top-1 -right-1 bg-[var(--color04)] text-white rounded-full p-0.5 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 닉네임 설정 */}
                <div className="flex items-center justify-center gap-2 mt-5">
                    닉네임 :
                    <Input type="text" placeholder="닉네임을 설정하세요." className="w-80" />
                </div>

                {/* 하단 확인 버튼 등 추가 가능 */}
                <div className="mt-8 flex justify-center">
                    <Button>등록</Button>
                </div>
            </div>

            <div className="ml-auto w-fit">
                <img className="block mx-auto w-155 " src="/images/bg.png" alt="배경" />
                {/* <img className="block mx-auto w-35 " src="/images/img_lamp.png" alt="조명" />
                <img className="block mx-auto w-90 " src="/images/img_desk2.png" alt="책상" /> */}
                {/* <img className="absolute left-1/2 top-[-50px] -translate-x-1/2 w-50 " src="/images/img_lamp.png" alt="조명" /> */}
                {/* <img className="absolute bottom-[-500px] " src="/images/img_desk2.png" alt="책상" /> */}
            </div>
        </section>
    );
}
