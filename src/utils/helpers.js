export const formatPrice = (price) => {
    return "₦ " + new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "NGN"
    }).format(price).substring(4,);
}

export const addLeadingZeros = (num) => {
    return String(num).padStart(5, '0');
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;

    return formattedDate;
}