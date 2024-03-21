import { test } from '../utils/fixtures';
import { data, testData } from '../configs/data';

for (const record of testData) {
  test(`List the products based on filters: ${record.Marke}, ${record.Producttart}, ${record.GeshFur}, ${record.FurWen}`, async ({ basePage, parfumePage }) => {
    console.log(record.Marke, record.Producttart, record.FurWen);

    await basePage.handleCoockieConsent();
    await basePage.handleMenu();
    await basePage.goto(data.baseURL);

    await basePage.waitForCoockieConsent();
    await basePage.openParfumePage();

    await parfumePage.filterByProductType(record.Producttart);
    await parfumePage.filterByBrand(record.Marke);
    await parfumePage.filterByGiftFor(record.GeshFur);
    await parfumePage.filterByGender(record.FurWen);
  });
}