import Handlebars from 'handlebars';
import productService from './../services/productService.js';
import homeTemplateSrc from './../templates/home.handlebars';

export async function renderHome() {
    const products = await productService.getProducts();
    const prices = await productService.getPrices();
    const homeTemplate = Handlebars.compile(homeTemplateSrc);
    const html = homeTemplate({ products, prices });
    document.getElementById('app').innerHTML = html;
}
