async page => {
  const assert=(condition,message)=>{if(!condition)throw new Error(message);};
  const errors=[]; const requests=[];
  const onError=error=>errors.push(error.message);
  const onRequest=request=>requests.push(request.url());
  page.on('pageerror',onError);page.on('request',onRequest);
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://localhost:4175/products/black-thai-honey-10-pack');
  await page.evaluate(()=>{localStorage.removeItem('honeypacks-storefront-v1');localStorage.removeItem('honeypacks-storefront-offer-dismissed');});
  await page.reload();
  await page.locator('.p1 h1').waitFor();
  assert(!await page.locator('.lab-toolbar').count(),'No lab toolbar in standalone build');
  await page.getByTestId('add-to-cart').click();
  await page.locator('.p1-cart-drawer').waitFor({state:'visible'});
  await page.getByRole('link',{name:'SECURE CHECKOUT',exact:true}).click();
  await page.getByRole('heading',{name:'Checkout',exact:true}).waitFor({state:'attached'});
  assert(page.url()==='http://localhost:4175/checkout','Standalone root checkout route');
  await page.reload();
  await page.locator('.p1-checkout-total').waitFor();
  assert((await page.locator('.p1-checkout-total dd').innerText()).includes('$55.00'),'Standalone persisted subscription cart');
  for(const path of ['/products','/account/login','/manage-subscription','/affiliate/apply','/privacy-policy','/not-found']){
    await page.goto(`http://localhost:4175${path}`);
    await page.locator('.p1 h1').waitFor({state:'attached'});
    assert(!await page.locator('a[href^="/propuestas/"]').count(),`No laboratory prefix on ${path}`);
  }
  await page.goto('http://localhost:4175/');
  await page.getByRole('dialog',{name:"You've got 10% off",exact:true}).getByRole('button',{name:'Nah, I’m good',exact:true}).click();
  await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'All Products',exact:true}).click();
  await page.getByRole('heading',{name:'ALL PRODUCTS',exact:true}).waitFor();
  assert(page.url()==='http://localhost:4175/products','Standalone client-side links');
  await page.screenshot({path:'evidence/storefront/standalone-catalog.png',animations:'disabled'});
  assert(requests.every(url=>url.startsWith('http://localhost:4175/')),'No external service requests in exported build');
  page.off('pageerror',onError);page.off('request',onRequest);
  assert(!errors.length,errors.join('\n'));
  return {checks:'Standalone production build: root routes, client-side navigation, cart persistence, local-only requests, 404, no laboratory UI',errors,requestCount:requests.length};
}
