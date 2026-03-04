import RavelrySection from './RavelrySection';

interface IProps {
    initialData: {
        crochet: any[];
        knitting: any[];
    };
}

export default function Main({ initialData }: IProps) {
    return (
        <div>
            {/* Ravelry 최신 도안 */}
            <RavelrySection initialData={initialData} />

            {/* Knitting Note 최신 도안 */}
            <div></div>
        </div>
    );
}
