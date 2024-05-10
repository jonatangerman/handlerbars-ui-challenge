import intialPrices from './stock-price';
import products from './products';

const prices = { ...intialPrices };


export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products), 100);
    });
};

export const getProduct = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products.find(product => product.id == id)), 100);
    });
};

export const getProductPrice = (sku) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(prices[sku])
        }, 100);
    });
};

export const getPrices = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(prices), 100);
    });
};

export const updateProductPrice = (sku) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let stockChange = Math.floor(Math.random() * 20) - 10;
            let priceChange = Math.floor(Math.random() * 1000) - 500;

            const price = (Number(prices[sku].price) + priceChange) / 100;
            if (price < 0) {
                prices[sku].price = 500;
            } else {
                prices[sku].price += priceChange;
            }

            const stock = Number(prices[sku].stock) + stockChange;

            if (stock < 0) {
                prices[sku].stock = 0;
            } else {
                prices[sku].stock += stockChange;
            }

            resolve(prices[sku]);
        }, 100);
    });
};