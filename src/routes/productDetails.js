import Handlebars from 'handlebars';
import productTemplateSrc from './../templates/PDP.handlebars';
import productService from './../services/productService.js';
import debounce from 'lodash.debounce';

function handleReadMore() {
    const button = document.querySelector('.read-more')
    if (button) {
        button.addEventListener('click', function () {
            const fullText = document.querySelector('.full-text');
            const truncatedText = document.querySelector('.truncated-text');

            if (fullText.classList.contains('hidden')) {
                fullText.classList.remove('hidden');
                truncatedText.classList.add('hidden');
                this.textContent = 'Read less';
            } else {
                fullText.classList.add('hidden');
                truncatedText.classList.remove('hidden');
                this.textContent = 'Read more';
            }
        });
    }
}

export async function renderProductDetail(productId) {
    const product = await productService.getProduct(productId);
    let currentSku = product.skus[0].code;
    let priceData = await productService.getProductPrice(currentSku);
    const productTemplate = Handlebars.compile(productTemplateSrc);
    let { price, stock } = priceData;

    function handleSkuSelect(e) {
        document.querySelectorAll('.size-button').forEach((button) => {
            button.addEventListener('click', async (e) => {
                currentSku = e.target.dataset.code;
                handleRerender(currentSku);
            })
        })
    }

    async function handleRerender(currentSkuParam) {
        let _currentSku = currentSkuParam instanceof Event ? currentSku : currentSkuParam;
        priceData = await productService.getProductPrice(_currentSku);
        let { price, stock } = priceData;
        renderTemplate(price, stock, _currentSku);
    }

    function renderTemplate(price, stock, currentSku) {
        const html = productTemplate({ product, price, stock, currentSku });
        document.getElementById('app').innerHTML = html;
        handleReadMore();
        handleSkuSelect();
    }

    renderTemplate(price, stock, currentSku);
    document.title = `${product.id} - ${product.brand} - Product Details`;

    const debouncedFunction = debounce(handleRerender, 2000);

    window.addEventListener('resize', debouncedFunction);

    setInterval(async () => {
        priceData = await productService.updatePrice(currentSku);
        let { price, stock } = priceData;
        renderTemplate(price, stock, currentSku);
    }, 5000);

}