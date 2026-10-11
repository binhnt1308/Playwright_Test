
import { test, expect } from '@playwright/test';

test('Register successfully - Nguyen Thanh Binh', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    const username = 'Nguyen Thanh Binh';
    const email = 'binhnguyen@example.com';

    // Điền thông tin đăng ký
    await page.locator("//form[@id='registrationForm']/descendant::input[@name='username']").fill(username);
    await page.locator("//form[@id='registrationForm']/descendant::input[@name='email']").fill(email);

    // Gender
    await page.locator("//input[@name='gender' and @value='female']").check();

    // Hobbies
    await page.locator("//input[@name='hobbies' and @value='reading']").check();
    await page.locator("//input[@name='hobbies' and @value='traveling']").check();
    await page.locator("//input[@name='hobbies' and @value='cooking']").check();

    // Interests và Country
    await page.locator("//select[@id='interests']").selectOption('music');
    await page.locator("//select[@id='country']").selectOption('canada');

    // Ngày sinh 
    await page.locator("//input[@id='dob']").fill('2005-08-13');

    // Ảnh đại diện (đảm bảo file tồn tại)
await page.locator("//input[@id='profile']").setInputFiles('C:\\Users\\THANH BINH\\Pictures\\lamviec\\test.jpg');
    // Biography
    await page.locator("//textarea[@id='bio']").fill('My name is Nguyen Thanh Binh hihi.');

    // Rating
    await page.locator("//input[@id='rating']").fill('7');

    // Favorite Color
    await page.locator("//input[@name='favcolor']").fill('#0000FF');

    // Newsletter
    await page.locator("//input[@id='newsletter']").check({ force: true });

    // Enable Feature - XPath Axes
    await page.locator(
        "//input[@id='toggleOption']/parent::label/child::span"
    ).click();

    // Star Rating
    const starRating = page.locator(
        "//form[@id='registrationForm']/descendant::div[@id='starRating']"
    );

    await starRating.evaluate((element) => {
        element.setAttribute('data-rating', '3.9');
        element.style.setProperty('--rating-width', '78%');
    });

    // Custom Date
    const dateInput = page.locator("//input[@id='customDate']");
    await dateInput.evaluate((element) => element.removeAttribute('readonly'));
    await dateInput.fill('2026-10-07');

    // Nhấn Register
    await page.locator(
        "//form[@id='registrationForm']/descendant::button[@type='submit']"
    ).click();

    // Kiểm tra dữ liệu sau khi đăng ký
    const firstRow = page.locator("//table/tbody/tr[1]");

    await expect(firstRow.locator('td').nth(1)).toHaveText(username);
    await expect(firstRow.locator('td').nth(2)).toHaveText(email);

    const infoCell = firstRow.locator('td').nth(3);

    await expect(infoCell).toContainText('Gender: female');
    await expect(infoCell).toContainText('Hobbies: reading, traveling, cooking');
    await expect(infoCell).toContainText('Country: canada');
    await expect(infoCell).toContainText('Date of Birth: 2005-08-13');
    await expect(infoCell).toContainText('Biography: My name is Nguyen Thanh Binh hihi');
    await expect(infoCell).toContainText('Rating: 7');
    await expect(infoCell).toContainText('Favorite Color: #0000ff');
    await expect(infoCell).toContainText('Newsletter: Yes');
    await expect(infoCell).toContainText('Enable Feature: Yes');
    await expect(infoCell).toContainText('Star Rating: 3.9');
    await expect(infoCell).toContainText('Custom Date: 2026-10-07');
});
