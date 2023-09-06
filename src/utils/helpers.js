export const formatPrice = (price) => {
    return "₦ " + new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "NGN"
    }).format(price).substring(4,);
}

export const addLeadingZeros = (num) => {
    return String(num).padStart(5, '0');
}
