import { renderHome } from './../routes/home.js';
import { renderProductDetail } from './../routes/productDetails.js';

export function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    route(path);
}

export async function route(path) {
    const { route, id } = extractRouteInfo(path);
    switch (route) {
        case '/':
        case '/home':
            renderHome();
            document.title = "Home Page";
            break;
        case '/product':
            renderProductDetail(id);
            break;
        default:
            document.getElementById('app').innerHTML = '<h1>Page Not Found</h1>';
    }
}

function extractRouteInfo(path) {
    if (path === '/') {
        return { route: '/' }
    }
    const segments = path.split('/').filter(segment => segment.length);
    if (segments[0] === 'product' && segments.length > 1) {
        return { route: '/product', id: segments[1].split('-')[0] };
    }
    return { route: `/${segments[0]}` };
}
