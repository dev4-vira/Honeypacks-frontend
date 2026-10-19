async page => {
  const results = [];
  const errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  const paths = ['/', '/products', '/products/black-thai-honey-10-pack', '/products/black-thai-honey-pro-max', '/products/beast-mode', '/products/shaker-white', '/checkout', '/account/login', '/account/lost-password', '/manage-subscription', '/about-us', '/contact-us', '/wholesale', '/affiliate', '/affiliate/apply', '/returns-refunds', '/privacy-policy', '/terms-conditions', '/missing-page'];
  await page.goto('http://localhost:5175/');
  await page.evaluate(() => {
    localStorage.setItem('honeypacks-storefront-offer-dismissed', '1');
    localStorage.setItem('honeypacks-storefront-v1', JSON.stringify({version:1, lines:[{product:'honey', mode:'one-time', quantity:1}], protection:true, shipping:'ground'}));
  });
  for (const viewport of [{width:1920,height:960}, {width:390,height:844}, {width:768,height:1024}, {width:360,height:780}]) {
    await page.setViewportSize(viewport);
    for (let i = 0; i < paths.length; i++) {
      await page.goto(`http://localhost:5175${paths[i]}`);
      await page.locator('.p1-storefront h1').waitFor({state:'attached'});
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(Array.from(document.images).filter(image=>image.loading!=='lazy').map(image=>image.decode().catch(()=>{})));
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      });
      const data = await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth > innerWidth+1,
        headings:document.querySelectorAll('h1').length,
        title:document.title,
        brokenImages:[...document.images].filter(image=>image.complete && image.naturalWidth===0).map(image=>image.src),
        overflowElements:[...document.querySelectorAll('.p1 main *')].filter(el=>{const r=el.getBoundingClientRect();return r.width && r.right>innerWidth+1 && getComputedStyle(el).position!=='absolute';}).slice(0,4).map(el=>el.className)
      }));
      if([1920,390].includes(viewport.width)) await page.screenshot({path:`evidence/storefront/${String(i+1).padStart(2,'0')}-${viewport.width}.png`,animations:'disabled'});
      results.push({path:paths[i],width:viewport.width,...data});
    }
  }
  page.off('pageerror',onError);
  const issues=results.filter(result=>result.overflow||result.headings!==1||result.brokenImages.length);
  if(issues.length||errors.length)throw new Error(JSON.stringify({issues,errors}));
  return {screens:results,errors};
}
