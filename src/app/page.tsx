import Main from '@/components/units/main';
import { fetchPatternsByCraft } from '@/lib/api/ravelry';

export default async function Home() {
    const [crochet, knitting] = await Promise.all([fetchPatternsByCraft('crochet'), fetchPatternsByCraft('knitting')]);
    return <Main initialData={{ crochet, knitting }} />;
}
