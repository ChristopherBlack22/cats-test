import Link from "next/link";
import CommsCard from "./CommsCard";
import catPic from '@public/images/Nara.jpg';
import { formatGBP } from "@/utils/formatPrices";

type WelcomeCardProps = {
    title: string;
    message: string;
    totalPrice: number;
    freeGift: boolean;
}

const WelcomeCard = ({title, message, totalPrice, freeGift} : WelcomeCardProps) => {

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