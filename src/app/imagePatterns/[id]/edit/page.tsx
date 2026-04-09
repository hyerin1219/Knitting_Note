import PatternsWriteImage from '@/components/units/imagePatterns/write';

export default async function ImagePatternsEditPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    return <PatternsWriteImage mode="edit" id={resolvedParams.id} />;
}
