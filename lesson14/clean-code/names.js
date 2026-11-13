const currentDate = new Date();
const adultUsers = users.filter((user) => user.age > 18);
function calculateDiscount(price, quantity) {
    const DISCOUNT_RATE = 0.1;
    return price * quantity * DISCOUNT_RATE;
}