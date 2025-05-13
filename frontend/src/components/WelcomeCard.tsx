import Link from "next/link";
import { notFound } from 'next/navigation';
import CommsCard from "./CommsCard";
import catPic from '@public/images/Nara.jpg';
import { formatGBP } from "@/utils/formatPrices";

async function getMessage (userId: string): Promise<{ title: string; message: string; totalPrice: number; freeGift: boolean; }> {
    const res = await fetch(`http://localhost:3001/comms/your-next-delivery/${userId}`, {cache: 'no-store'});
    if (!res.ok) {
        notFound();
    }
    const welcomeMsg = await res.json();
    return welcomeMsg;
}

type WelcomeCardProps = {
    userId: string;
}

const WelcomeCard = async ({ userId } : WelcomeCardProps) => {
    const {title, message, totalPrice, freeGift} = await getMessage(userId);

    const priceTxt = `Total price: ${formatGBP(totalPrice)}`

    return (
        <CommsCard 
            title={title}
            message={message}
            img={catPic}
            keyTxt={priceTxt}
            stickerTxt={freeGift ? 'FREE GIFT' : ''}
        >
            <Link href='#' className="link-btn link-btn--primary">
                SEE DETAILS
            </Link>
            <Link href='#' className="link-btn">
                EDIT DELIVERY
            </Link>
        </CommsCard>
    )
};

export default WelcomeCard;