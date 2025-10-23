const calcluteDiscount = (price: number, discountPercentage: number) => {
    let finalPrice: number = price;
    if (discountPercentage) {
        const discountAmount = price * discountPercentage / 100
        finalPrice = price - discountAmount
    }
    return finalPrice
}

export default calcluteDiscount