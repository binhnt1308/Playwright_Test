
const { test, expect } = require('@playwright/test');

const SIGNUP_URL = 'https://vivainternational.vn/auth/signup';

test.describe('Viva International - Đăng ký', () => {

    test('TC01 - Đăng ký tài khoản thành công', async ({ page }) => {

        await page.goto(SIGNUP_URL);
        await page.waitForTimeout(5000);

        // Họ và tên
        await page.locator("//input[@name='name']")
            .fill("Nguyen Thanh Binh");
        await page.waitForTimeout(5000);

        // Số điện thoại
        await page.locator("//input[@name='phone']")
            .fill("0901234567");
        await page.waitForTimeout(5000);

        // Email
        await page.locator("//input[@name='email']")
            .fill("binh.test" + Date.now() + "@gmail.com");
        await page.waitForTimeout(5000);

        // Mật khẩu
        await page.locator("//input[@name='password']")
            .fill("Binh@123456");
        await page.waitForTimeout(5000);

        // Đăng ký
        await page.locator(
            "//button[@type='submit' and normalize-space()='Đăng ký']"
        ).click();

        await page.waitForTimeout(5000);

        // Kiểm tra sau khi đăng ký
        await expect(page).not.toHaveURL(/signup/);
    });


    test('TC02 - Bỏ trống tất cả trường và kiểm tra thông báo lỗi', async ({ page }) => {

        await page.goto(SIGNUP_URL);
        await page.waitForTimeout(5000);

        // Click Đăng ký khi không nhập dữ liệu
        await page.locator(
            "//button[@type='submit' and normalize-space()='Đăng ký']"
        ).click();

        await page.waitForTimeout(5000);

        // Tìm thông báo lỗi
        const errorMessages = page.locator(
            "//*[contains(@class,'text-red') or contains(@class,'error')]"
        );

        await expect(errorMessages.first()).toBeVisible();

        expect(await errorMessages.count()).toBeGreaterThan(0);
    });

});

