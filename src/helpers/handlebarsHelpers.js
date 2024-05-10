import Handlebars from 'handlebars';

export function formatPrice(price) {
    return `$${(price / 100).toFixed(2)}`;
}

function toKebabCase(str) {
    return str
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9\-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

function getTruncationLength() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 400) {
        return 200;
    } else if (screenWidth <= 720) {
        return 300;
    } else {
        return 1000;
    }
}

export function registerHelpers() {
    Handlebars.registerHelper('getFirstPrice', function (price, key) {
        const formattedPrice = formatPrice(price[key].price);
        return new Handlebars.SafeString(formattedPrice);
    });

    Handlebars.registerHelper('formatPrice', function (price) {
        const formattedPrice = formatPrice(price);
        return new Handlebars.SafeString(formattedPrice);
    });

    Handlebars.registerHelper('getId', function (id, brand) {
        return `${id}-${toKebabCase(brand)}`
    });

    Handlebars.registerHelper('formatSku', function (text) {
        return text.replace(/\bCans\b|\bBottles\b/g, "").replace(/\s{2,}/g, " ").trim();
    });

    Handlebars.registerHelper('isActiveSku', function (code, currentCode) {
        return code == currentCode
    });

    Handlebars.registerHelper('responsiveTruncate', function (text) {
        let truncatedText = text;
        let needsButton = false;
        const length = getTruncationLength();

        if (text.length > length) {
            needsButton = true;
            truncatedText = text.substring(0, length) + "...";
        }

        return new Handlebars.SafeString(
            `<p class="truncated-text description info-text">${truncatedText}</p>` +
            `<p class="full-text hidden description info-text">${text}</p>` +
            (needsButton ? `<button class="read-more truncating-button info-text">Read more</button>` : '')
        );
    });
}