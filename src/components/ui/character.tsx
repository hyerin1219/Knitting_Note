import { IUserInfo } from '@/types';

interface IProps {
    currentUser: IUserInfo;
}
export default function Character({ currentUser }: IProps) {
    return (
        <div className="">
            <div className="flex items-center gap-4   border border-[var(--color04)] rounded-2xl px-5 py-3 shadow bg-white">
                {/* 캐릭터 */}
                <div className="relative w-18 h-18 rounded-full bg-white border border-[var(--color04)] p-2">
                    <img src={`/images/char/char_${currentUser.character}.png`} alt="character" className="w-full h-full object-contain" />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col">
                    <span className="font-semibold ">{currentUser.nickName}</span>
                    <span className="text-sm text-gray-500">가입일 {currentUser.createdAt}</span>
                </div>
            </div>
        </div>
    );
}
