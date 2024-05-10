import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.css';
import { route } from './utils/router.js';
import { registerHelpers } from './helpers/handlebarsHelpers';
import { registerPartials } from './helpers/handlebarsPartials';

registerHelpers();
registerPartials();

document.addEventListener('DOMContentLoaded', () => {
    route(window.location.pathname);
    window.onpopstate = () => route(window.location.pathname);
});
