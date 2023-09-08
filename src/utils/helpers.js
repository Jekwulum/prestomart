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

export const generateFlutterwaveConfig = (customer, amount, pubk) => {
    return {
        public_key: pubk,
        tx_ref: "PRESTOMART_CLIENT_FLW_TRANSACTION_" + Date.now(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: customer.email,
            phone_number: customer.phone_number,
            name: customer.first_name + " " + customer.last_name,
        },
        customizations: {
            title: 'Prestomart Cart',
            description: 'Payment for items in cart',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
};
