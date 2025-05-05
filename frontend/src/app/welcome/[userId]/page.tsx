import { notFound } from 'next/navigation';
import WelcomeCard from '@/components/WelcomeCard';

const WelcomePage = async ({ params }: { params: { userId: string } }) => {
    const { userId } = await params;
    if  (!userId) {
        notFound()
    }
    const res = await fetch(`http://localhost:3001/comms/your-next-delivery/${userId}`, {cache: 'no-store'});

    if (!res.ok) {
        notFound();
    }
    const welcomeMsg = await res.json();

    return (
        <section className="page page--welcome">
            <WelcomeCard {...welcomeMsg} />
        </section>
    )
};

export default WelcomePage;
