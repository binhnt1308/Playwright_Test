
import { test, expect } from '@playwright/test';

test('BT3 - Tìm kiếm cà phê và đặt hàng', async ({ page }) => {
  await page.goto('https://vivainternational.vn/');

  // CÂU 1: TÌM KIẾM SẢN PHẨM CÀ PHÊ
  await page.locator(
    '//form[contains(@class,"relative")]//input[contains(@class,"form-input")]'
  ).first().fill('cà phê');

  await page.locator(
    '//form[contains(@class,"relative")]//button[@type="submit"]'
  ).first().click();

  // Kiểm tra hiển thị 18 sản phẩm
  await expect(
    page.locator('//div[contains(@class,"group") and contains(@class,"relative")]')
  ).toHaveCount(18);

  // CÂU 2: QUY TRÌNH ĐẶT HÀNG

  // Cần thêm sản phẩm vào giỏ hàng trước bước này.
  // Selector thêm giỏ hàng cần xác nhận theo HTML thực tế.

  await page.locator('//button[@aria-label="cart"]').first().click();

  await page.locator(
    '//div[contains(@class,"drawer-content")]//button[contains(normalize-space(.),"Tiến hành thanh toán")]'
  ).click();

  // Nhập thông tin khách hàng
  await page.locator(
    '//div[contains(@class,"relative")]//input[contains(@name,"name")]'
  ).fill('Bình Nguyễn');

  await page.locator(
    '//div[contains(@class,"relative")]//input[contains(@name,"contact")]'
  ).fill('0938656910');

  await page.locator(
    '//div[contains(@class,"relative")]//input[contains(@name,"address")]'
  ).fill('123 Đường ABC');

  await page.locator(
    '//div[contains(@class,"relative")]//input[contains(@name,"ward")]'
  ).fill('Phường XYZ');

  await page.locator(
    '//select[contains(@name,"city")]'
  ).selectOption({ label: 'TP. Hồ Chí Minh' });

  await page.locator(
    '//input[contains(@name,"shippingOption")]'
  ).first().check();

  await page.locator(
    '//input[contains(@name,"paymentMethod")]'
  ).first().check();

  // Chỉ bật khi được phép tạo đơn hàng thử nghiệm
  // await page.locator(
  //   '//button[@type="submit" and @title="Xác nhận đặt hàng"]'
  // ).click();

  // Kiểm tra sau khi đã thực sự xác nhận đơn hàng
  // await expect(
  //   page.getByRole('heading', { name: 'Đặt hàng thành công!' })
  // ).toBeVisible();
});
