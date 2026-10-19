async page => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const results = [];
  const errors = [];
  const submissions = [];
  const onError = error => errors.push(error.message);
  const onRequest = request => { if (request.method() !== 'GET') submissions.push(`${request.method()} ${request.url()}`); };
  page.on('pageerror', onError);
  page.on('request', onRequest);
  const go = async path => { await page.goto(`http://localhost:5175${path}`); await page.locator('.p1-storefront h1').waitFor({state:'attached'}); };
  for (const width of [1920, 390]) {
    await page.setViewportSize({width,height:width===1920?960:844});
    await go('/');
    await page.evaluate(()=>{localStorage.removeItem('honeypacks-storefront-v1');localStorage.removeItem('honeypacks-storefront-offer-dismissed');});
    await page.reload();
    const offer = page.getByRole('dialog', {name:"You've got 10% off",exact:true});
    await offer.waitFor();
    await offer.getByRole('button',{name:'GET YOUR 10% OFF',exact:true}).click();
    assert((await offer.getByRole('status').innerText()).includes('no valid coupon'), 'Offer does not create undisclosed codes');
    await page.screenshot({path:`evidence/storefront/popup-${width}.png`,animations:'disabled'});
    await offer.getByRole('button',{name:'Nah, I’m good',exact:true}).click();
    await page.reload();
    assert(await page.locator('dialog[open]').count()===0,'Offer dismissal persists');
    if(width===390){
      await page.getByRole('button',{name:'Open menu',exact:true}).click();
      await page.getByRole('dialog',{name:'Menu',exact:true}).getByRole('link',{name:'All Products',exact:true}).click();
    } else await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'All Products',exact:true}).click();
    await page.getByRole('heading',{name:'ALL PRODUCTS',exact:true}).waitFor();
    assert(await page.locator('.p1-catalog .p1-product-card').count()===10,'Ten products');
    await page.evaluate(()=>{window.__spaCheck='kept';});
    await page.getByRole('button',{name:'FILTER',exact:true}).click();
    const filter=page.getByRole('dialog',{name:'FILTER',exact:true});
    await filter.getByRole('checkbox',{name:'On Sale',exact:true}).check();
    assert(await page.locator('.p1-catalog .p1-product-card').count()===7,'Seven sale products');
    await filter.getByRole('button',{name:'CLEAR',exact:true}).click();
    await filter.getByLabel('Stock availability').selectOption('out');
    assert(await page.locator('.p1-catalog .p1-product-card').count()===0,'Out of stock empty state');
    await filter.getByRole('button',{name:'CLEAR',exact:true}).click();
    await filter.getByLabel('Set price').selectOption('under25');
    assert(await page.locator('.p1-catalog .p1-product-card').count()===2,'Price filter');
    await filter.getByRole('button',{name:'CLEAR',exact:true}).click();
    await filter.getByLabel('Sort products').selectOption('az');
    const names=await page.locator('.p1-catalog .p1-card-name').allTextContents();
    assert(JSON.stringify(names)===JSON.stringify([...names].sort((a,b)=>a.localeCompare(b))),'A–Z sorting');
    await page.screenshot({path:`evidence/storefront/filters-${width}.png`,animations:'disabled'});
    await page.keyboard.press('Escape');
    await page.locator('.p1-catalog').getByRole('link',{name:'View Black Thai Honey 10 Pack',exact:true}).click();
    await page.locator('.p1-product-price').waitFor();
    assert(await page.evaluate(()=>window.__spaCheck)==='kept','Client-side navigation');
    assert(await page.locator('input[value="subscription"]').isChecked(),'Honey defaults to subscription');
    assert(await page.locator('.p1-product-price>strong').innerText()==='$50.00','Honey subscription price');
    await page.getByRole('button',{name:'Show Honey 10 Pack image 2',exact:true}).click();
    assert((await page.locator('.p1-product-image>img').getAttribute('src')).includes('supplement-facts'),'Gallery switches');
    await page.locator('input[value="one-time"]').check();
    assert(await page.locator('.p1-product-price>strong').innerText()==='$65.00','One-time price updates');
    assert(!await page.locator('.p1-gift-options').count(),'Gift selection hidden on one-time purchase');
    await page.getByTestId('add-to-cart').click();
    const cart=page.locator('.p1-cart-drawer');
    await cart.waitFor({state:'visible'});
    assert(await cart.locator('.p1-cart-subtotal dd').innerText()==='$65.00','Cart one-time subtotal');
    assert(!await cart.getByRole('switch').isChecked(),'Protection off by default');
    await cart.getByRole('button',{name:'Increase quantity',exact:true}).click();
    assert(await cart.locator('.p1-cart-subtotal dd').innerText()==='$130.00','Cart quantity updates');
    assert(await cart.locator('.p1-cart-gift').isVisible(),'Gift appears with two Honey boxes');
    await cart.getByRole('button',{name:'Decrease quantity',exact:true}).click();
    assert(await cart.locator('.p1-cart-gift').count()===0,'Gift removed with one Honey box');
    await cart.getByRole('switch').check();
    assert(await cart.locator('.p1-cart-subtotal dd').innerText()==='$67.56','Protection included visibly');
    await page.screenshot({path:`evidence/storefront/cart-${width}.png`,animations:'disabled'});
    await cart.getByRole('link',{name:'SECURE CHECKOUT',exact:true}).click();
    await page.locator('.p1-checkout-total').waitFor();
    assert(page.url()==='http://localhost:5175/checkout','Root checkout route');
    assert((await page.locator('.p1-checkout-total dd').innerText()).includes('$72.56'),'Ground total matches audit');
    await page.getByRole('radio',{name:/Expedited Shipping/}).check();
    assert((await page.locator('.p1-checkout-total dd').innerText()).includes('$79.23'),'Express total matches audit');
    await page.getByLabel('Enter promo code',{exact:true}).fill('INVALID');
    await page.getByRole('button',{name:'Apply',exact:true}).click();
    assert((await page.locator('.p1-promo-code [role="status"]').innerText()).includes('Invalid promo code'),'Invalid coupon error');
    await page.getByRole('checkbox',{name:'Billing address same as shipping address',exact:true}).uncheck();
    assert(await page.locator('input[name="billingAddress"]').isVisible(),'Separate billing address');
    await page.getByRole('button',{name:'Complete checkout',exact:true}).click();
    assert(await page.locator('input[name="email"]').getAttribute('aria-invalid')==='true','Checkout required fields');
    for(const prefix of ['delivery','billing']){
      for(const [key,value] of [['First','Demo'],['Last','Buyer'],['Address','123 Example Street'],['City','Austin'],['Zip','78701']]) await page.locator(`input[name="${prefix}${key}"]`).fill(value);
      await page.locator(`select[name="${prefix}State"]`).selectOption('TX');
    }
    await page.locator('input[name="email"]').fill('demo@example.com');
    await page.getByRole('radio',{name:/Apple Pay/}).check();
    await page.getByRole('button',{name:'Complete checkout',exact:true}).click();
    assert((await page.locator('.p1-checkout-result').innerText()).includes('no order placed or payment taken'),'No false order or charge');
    assert(await page.locator('input[autocomplete^="cc-"],input[name*="card"],input[name*="cvc"]').count()===0,'No card inputs');
    assert(!await page.evaluate(()=>Object.values(localStorage).some(value=>value.includes('demo@example.com')||value.includes('Example Street'))),'No persisted contact or address');
    await page.getByRole('link',{name:'Continue shopping',exact:true}).click();
    await page.reload();
    await page.getByRole('button',{name:/Open cart,/}).click();
    assert(await page.locator('.p1-cart-subtotal dd').innerText()==='$67.56','Cart persists across routes and reload');
    await page.getByRole('button',{name:'Remove Honey 10 Pack one-time',exact:true}).click();
    assert(await page.getByRole('heading',{name:'Your cart is empty',exact:true}).isVisible(),'Empty cart');
    assert(await page.locator('.p1-cart-recommendations article').count()===4,'Empty cart recommendations');
    await page.screenshot({path:`evidence/storefront/empty-cart-${width}.png`,animations:'disabled'});
    await page.keyboard.press('Escape');

    for(const [slug,mode,first,second] of [['black-thai-honey-pro-max','subscription','$50.00','$65.00'],['beast-mode','one-time','$60.00','$48.00'],['shaker-white','none','$11.99','']]){
      await go(`/products/${slug}`);
      assert(await page.locator('.p1-product-price>strong').innerText()===first,`${slug} reference price`);
      if(mode==='none')assert(await page.locator('input[name="p1-purchase-mode"]').count()===0,'Accessory has no subscription');
      else {
        assert(await page.locator(`input[value="${mode}"]`).isChecked(),`${slug} default mode`);
        await page.locator(`input[value="${mode==='subscription'?'one-time':'subscription'}"]`).check();
        assert(await page.locator('.p1-product-price>strong').innerText()===second,`${slug} changed price`);
      }
    }
    results.push({width,checks:'popup, client routing, 10/7/0 filters, sorting, gallery, purchase options, cart, gift, protection, checkout shipping/billing/coupon/validation, persistence, empty state, product-specific modes'});
  }
  page.off('pageerror',onError);page.off('request',onRequest);
  assert(!errors.length,errors.join('\n'));
  assert(!submissions.length,submissions.join('\n'));
  return {results,errors,submissions};
}
