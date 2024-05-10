import axios from 'axios';
import * as MockApi from '/db/MockApi';

const api = axios.create({
    adapter: async (config) => {
        const identifier = config.url.split('/')[3];
        switch (config.url) {
            case '/api/products':
                return MockApi.getProducts().then(data => {
                    return { data, status: 200 };
                });
            case '/api/prices':
                return MockApi.getPrices().then(data => {
                    return { data, status: 200 };
                });
            case `/api/stock-price/${identifier}`:
                if (config.method == 'get') {
                    return MockApi.getProductPrice(identifier).then(data => {
                        return { data, status: 200 };
                    });
                } else {
                    return MockApi.updateProductPrice(identifier).then(data => {
                        return { data, status: 200 };
                    });
                }

            case `/api/product/${identifier}`:
                return MockApi.getProduct(identifier).then(data => {
                    return { data, status: 200 };
                });
            default:
                return Promise.resolve({ data: null, status: 404 });
        }
    }
});

const service = {
    getProducts() {
        return api.get('/api/products').then(response => {
            return response.data;
        })
    },
    getProduct(id) {
        return api.get(`/api/product/${id}`).then(response => {
            return response.data;
        })
    },
    getPrices() {
        return api.get('/api/prices').then(response => {
            return response.data;
        })
    },
    getProductPrice(sku) {
        return api.get(`/api/stock-price/${sku}`).then(response => {
            return response.data;
        })
    },

    updatePrice(sku) {
        return api.put(`/api/stock-price/${sku}`).then(response => {
            return response.data;
        })
    }
}

export default service;

