import Image, { StaticImageData }  from 'next/image';

type CommsCardProps = {
    title: string;
    message: string;
    img: StaticImageData,
    keyTxt: string;
    stickerTxt?: string;
    children: React.ReactNode;
}

const CommsCard = ({img, title, message, keyTxt, stickerTxt, children}: CommsCardProps) => {

    return (
        <div className="card card--comms">
            <div className="card__img-container">
                <Image src={img} alt="" />
            </div>
            <div className="card__content">
                <h1 className="card__title">{title}</h1>
                <p>{message}</p>
                <p className="card__key-text">
                    <strong>{keyTxt}</strong>
                </p>
                <div className="card__actions">
                    {children}
                </div>
            </div>
            {stickerTxt && (
                <div className="card__sticker">{stickerTxt}</div>
            )}
        </div>
    )
};

export default CommsCard;