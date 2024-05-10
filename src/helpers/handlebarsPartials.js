import Handlebars from 'handlebars';
import productDetailTemplate from './../partials/productDetail.handlebars';
import ctaTemplate from './../partials/cta.handlebars';
import topBarTemplate from './../partials/product.top-bar.handlebars';
import stickyFooterTemplate from './../partials/sticky-menu.handlebars';

export function registerPartials() {
    Handlebars.registerPartial('productDetail', productDetailTemplate);
    Handlebars.registerPartial('cta', ctaTemplate);
    Handlebars.registerPartial('topBar', topBarTemplate);
    Handlebars.registerPartial('stickyMenu', stickyFooterTemplate);
}