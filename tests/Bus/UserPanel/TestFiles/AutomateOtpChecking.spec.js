const { test, expect, request } = require('@playwright/test');

test('OTP becomes invalid after resend and new OTP works', async ({ page }) => {
    const websiteUrl = 'https://dev-jatri.jatritech.com/';
    const otpApiUrl = 'https://api.multimode.dev-jatri.jatritech.com/auth/api/v1/send-otp';
    const phoneNumber = '01983285059'; // Replace with valid number

    // Step 1: Go to Login Page
    await page.goto(websiteUrl);

    // Step 2: Enter phone number
    await page.click('button:has-text("Accept All")');
    await page.click('[href="/login"]');
    await page.fill('#mobile', phoneNumber);
    await page.click('button:has-text("Get OTP")');

    // Step 3: Call OTP API to get the first OTP (Mocked or use internal dev/test hook)
    const apiContext = await request.newContext();
    const response1 = await apiContext.post(otpApiUrl, {
        data: { phone: phoneNumber },
    });
    const result1 = await response1.json();
    const firstOtp = result1.otp || '123456'; // Replace with actual OTP if accessible

    console.log('First OTP:', firstOtp);

    // Step 4: Wait for 60 seconds (simulate resend delay)
    await page.waitForTimeout(60000);

    // Step 5: Resend OTP
    await page.click('button:has-text("Resend OTP")');

    // Step 6: Get second OTP from the API
    const response2 = await apiContext.post(otpApiUrl, {
        data: { phone: phoneNumber },
    });
    const result2 = await response2.json();
    const secondOtp = result2.otp || '654321'; // Replace with actual OTP if accessible

    console.log('Second OTP:', secondOtp);

    // Step 7: Try verifying with first OTP (should fail)
    await page.fill('input[name="otp"]', firstOtp);
    await page.click('button:has-text("Verify")');

    const errorMessage = await page.locator('.error-message').textContent();
    expect(errorMessage).toContain('invalid'); // Adjust based on actual UI message

    // Step 8: Try with second OTP (should pass)
    await page.fill('input[name="otp"]', secondOtp);
    await page.click('button:has-text("Verify")');

    // Step 9: Check if redirected or success message appears
    await expect(page).toHaveURL(/dashboard|home|success/i); // Adjust based on expected redirect

    console.log('OTP verification automation completed.');
});
