async page => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://localhost:5175/account');
    await page.evaluate(() => sessionStorage.removeItem('honeypacks-mock-session-v1'));
    await page.goto('http://localhost:5175/account');
    await page.waitForURL('**/account/login');
    await page.locator('[name="username"]').fill('subscriber@example.com');
    await page.locator('[name="password"]').fill('wrong');
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    assert(await page.getByRole('alert').isVisible(), 'Reject invalid password');
    await page.locator('[name="password"]').fill('HoneyDemo123!');
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    await page.waitForURL('**/account');
    assert(await page.getByRole('heading', { name: 'Welcome, Sam Taylor' }).isVisible(), 'Subscriber dashboard');
    await page.reload();
    assert(await page.getByRole('heading', { name: 'Welcome, Sam Taylor' }).isVisible(), 'Session survives reload');
    await page.locator('main').getByRole('link', { name: 'Manage Subscription', exact: true }).click();
    await page.getByRole('button', { name: 'Pause subscription', exact: true }).click();
    await page.reload();
    assert(await page.getByRole('button', { name: 'Resume subscription', exact: true }).isVisible(), 'Paused state persists');
    await page.getByRole('button', { name: 'Resume subscription', exact: true }).click();
    await page.getByRole('button', { name: 'Skip next delivery', exact: true }).click();
    assert(await page.getByRole('button', { name: 'Skip next delivery', exact: true }).isDisabled(), 'Skip applies once');
    await page.getByRole('button', { name: 'Cancel subscription', exact: true }).click();
    assert(await page.getByRole('button', { name: 'Resume subscription', exact: true }).count() === 0, 'Cancelled has no resume');
    await page.getByRole('button', { name: 'Reset simulation', exact: true }).click();
    assert(await page.getByRole('button', { name: 'Pause subscription', exact: true }).isVisible(), 'Reset restores active fixture');
    await page.getByRole('link', { name: 'Back to my account', exact: true }).click();
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await page.waitForURL('**/account/login');
    assert(await page.evaluate(() => sessionStorage.getItem('honeypacks-mock-session-v1')) === null, 'Sign-out removes session');
    await page.getByRole('button', { name: 'Explore as customer', exact: true }).click();
    await page.locator('main').getByRole('link', { name: 'Manage Subscription', exact: true }).click();
    assert(await page.getByRole('heading', { name: 'No subscriptions yet' }).isVisible(), 'Customer empty state');
    assert(!await page.evaluate(() => JSON.stringify(sessionStorage).includes('HoneyDemo123!')), 'Password never stored');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
    await page.getByRole('link', { name: 'Back to my account', exact: true }).click();
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  }
  assert(!errors.length, errors.join('\n'));
  return { widths: [1440, 390], errors };
}
