import PatternsWrite from '@/components/units/patterns/write';

export default async function PatternsEditPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    return <PatternsWrite mode="edit" id={resolvedParams.id} />;
}
