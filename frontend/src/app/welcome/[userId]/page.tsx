import WelcomeCard from '@/components/WelcomeCard';

const WelcomePage = async ({ params }: { params: { userId: string } }) => {
    const { userId } = await params;

    return (
        <section className="page page--welcome">
            <WelcomeCard userId={userId} />
        </section>
    )
};

export default WelcomePage;
