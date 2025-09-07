import { Route } from '@playwright/test';

export async function interceptBarksiAPI(route: Route) {
    // Делаем реальный запрос и получаем ответ от API
    const response = await route.fetch();
    const json = await response.json();
    const catalog = json.pageProps?.catalog;
    // Проверяем, что структура ответа корректна и есть товары
    if (
        !catalog ||
        !catalog.goods ||
        !Array.isArray(catalog.goods) ||
        catalog.goods.length === 0
    ) {
        // Если структура не подходит — пропускаем запрос без изменений
        return route.continue();
    }
    // Модифицируем первые три товара
    const modifiedGoods = catalog.goods.slice(0, 3).map((item: any, idx: number) => {
        if (!item.prices || !Array.isArray(item.prices) || item.prices.length === 0) return item;
        if (idx < 2) {
            // Для первых двух товаров — изменяем только первую цену
            const priceInfo = item.prices[0];
            if (!priceInfo['price-wd']) return item;
            const oldPrice = parseFloat(priceInfo['price-wd'].replace(',', '.'));
            const newPrice = (oldPrice * 0.05).toFixed(2).replace('.', ',');
            priceInfo.price = newPrice;
            priceInfo.discount = "95";
            priceInfo['action-text'] = "-95%";
            priceInfo['action-all-label'] = ["-95%"];
        } else if (idx === 2) {
            // Для третьего товара — изменяем все цены
            item.prices.forEach((priceInfo: any) => {
                if (!priceInfo['price-wd']) return;
                const oldPrice = parseFloat(priceInfo['price-wd'].replace(',', '.'));
                const newPrice = (oldPrice * 0.05).toFixed(2).replace('.', ',');
                priceInfo.price = newPrice;
                priceInfo.discount = "95";
                priceInfo['action-text'] = "-95%";
                priceInfo['action-all-label'] = ["-95%"];
            });
        }
        // Устанавливаем скидочные поля для карточки товара
        item['special-offer-text'] = '-95%';
        item['special-offer-faso-text'] = '-95%';

        return item;
    });
    // Подменяем товары в ответе
    json.pageProps.catalog.goods = modifiedGoods;
    // Отправляем модифицированный ответ вместо оригинального
    await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(json),
    });
}