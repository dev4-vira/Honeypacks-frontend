async page => {
  const assert=(condition,message)=>{if(!condition)throw new Error(message);};
  const results=[];
  const go=async path=>{await page.goto(`http://localhost:5175${path}`);await page.locator('.p1 h1').waitFor({state:'attached'});};
  const keyboardModal=async(trigger,dialog)=>{
    await trigger.focus();
    await page.keyboard.press('Enter');
    await dialog.waitFor({state:'visible'});
    for(let i=0;i<18;i++){
      await page.keyboard.press('Tab');
      assert(await page.evaluate(()=>document.activeElement===document.body||!!document.activeElement?.closest('dialog[open]')),'Modal excludes background controls');
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({state:'hidden'});
    assert(await trigger.evaluate(el=>el===document.activeElement),'Focus returns to modal trigger');
  };
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [1440,360]){
    await page.setViewportSize({width,height:width===360?780:1000});
    await go('/products/black-thai-honey-10-pack');
    await keyboardModal(page.getByRole('button',{name:'Enlarge Honey 10 Pack image 1',exact:true}),page.getByRole('dialog',{name:'Honey 10 Pack — image 1',exact:true}));
    await keyboardModal(page.getByRole('button',{name:'Subscription Details',exact:true}),page.getByRole('dialog',{name:'Subscription Details',exact:true}));
    const description=page.locator('.p1-accordion summary').filter({hasText:'Description'});
    await description.focus();await page.keyboard.press('Space');
    assert(await description.evaluate(el=>el.parentElement.open),'Keyboard product accordion');
    const faq=page.locator('.p1-faq summary').first();
    await faq.focus();await page.keyboard.press('Enter');
    assert(await faq.evaluate(el=>el.parentElement.open),'Keyboard FAQ');
    await keyboardModal(page.getByTestId('add-to-cart'),page.locator('.p1-cart-drawer'));
    if(width===360)await keyboardModal(page.getByRole('button',{name:'Open menu',exact:true}),page.getByRole('dialog',{name:'Menu',exact:true}));
    await go('/products');
    await keyboardModal(page.getByRole('button',{name:'FILTER',exact:true}),page.getByRole('dialog',{name:'FILTER',exact:true}));
    await page.getByRole('link',{name:'View Black Thai Honey 10 Pack',exact:true}).first().click();
    await page.locator('.p1-product-price').waitFor();
    await page.goBack();
    await page.getByRole('heading',{name:'ALL PRODUCTS',exact:true}).waitFor();
    await page.goForward();
    await page.locator('.p1-product-price').waitFor();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Reduced motion layout fits');
    assert(await page.evaluate(()=>document.getAnimations().every(a=>a.playState!=='running')),'No running animations under reduced motion');
    results.push({width,checks:'keyboard zoom, subscription modal, cart, filter, mobile menu, focus return and containment, accordions, back/forward, reduced motion'});
  }
  const aliases=[['/products/honey-10-pack','black-thai-honey-10-pack'],['/products/pro-max','black-thai-honey-pro-max'],['/honey-10-pack','black-thai-honey-10-pack'],['/pro-max','black-thai-honey-pro-max']];
  for(const [alias,slug] of aliases){
    await go(alias);
    await page.waitForURL(`**/products/${slug}`);
    await page.locator('.p1-product-price').waitFor();
  }
  await go('/products/not-a-product');
  await page.getByRole('heading',{name:'This page could not be found.',exact:true}).waitFor();
  await page.getByRole('link',{name:'VIEW PRODUCTS',exact:true}).click();
  await page.getByRole('heading',{name:'ALL PRODUCTS',exact:true}).waitFor();
  const footerLinks=await page.locator('.p1-footer-grid a').evaluateAll(links=>links.map(a=>({label:a.textContent.trim(),path:new URL(a.href).pathname})));
  assert(footerLinks.every(link=>link.path.startsWith('/')&&!link.path.startsWith('/propuestas/')),'Root footer links without laboratory routes');
  const duplicates=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);return ids.filter((id,i)=>ids.indexOf(id)!==i);});
  assert(!duplicates.length,'No duplicated DOM IDs');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return {results,aliases:aliases.length,footerLinks,checks:'Not a WCAG audit or screen-reader validation'};
}
