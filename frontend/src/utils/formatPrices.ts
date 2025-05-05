export const formatPrice = (price: number, currency: string): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(price);
};

export const formatGBP = (price: number) => {
    return formatPrice(price, 'GBP')
};
