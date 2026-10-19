async page => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const results = [];
  const errors = [];
  const submissions = [];
  const onError = error => errors.push(error.message);
  const onRequest = request => { if (request.method() !== 'GET') submissions.push(request.url()); };
  page.on('pageerror', onError);
  page.on('request', onRequest);
  const go = async path => { await page.goto(`http://localhost:5175${path}`); await page.locator('.p1-storefront h1').waitFor({state:'attached'}); };
  for(const width of [1440,390]) {
    await page.setViewportSize({width,height:width===390?844:1000});
    for(const path of ['/contact-us','/account/lost-password','/manage-subscription','/wholesale','/affiliate/apply']) {
      await go(path);
      const forms = page.locator('main .p1-demo-form');
      assert(await forms.count() === (path==='/wholesale'?2:1),`${path} form placements`);
      for (const form of await forms.all()) {
        await form.getByRole('button',{name:/SEND|Reset password|Continue with email|Get My Pricing|Submit demo application/}).click();
        assert(await form.getByRole('alert').isVisible(),`${path} required validation`);
        const inputs=form.locator('input,textarea,select');
        for(const field of await inputs.all()){
          const meta=await field.evaluate(el=>({tag:el.tagName,type:el.type,name:el.name}));
          if(meta.tag==='SELECT')await field.selectOption({index:1});
          else await field.fill(meta.type==='email'?'sample@example.com':meta.type==='tel'?'2025550100':meta.name==='zip'?'78701':'Sample demo');
        }
        const email=form.locator('input[type="email"]');
        if(await email.count()) {
          await email.fill('invalid');
          await form.locator('button[type="submit"]').click();
          assert(await email.getAttribute('aria-invalid')==='true',`${path} email validation`);
          await email.fill('sample@example.com');
        }
        await form.locator('button[type="submit"]').click();
        assert((await form.getByRole('status').innerText()).includes('Demo'),`${path} explicit demo feedback`);
        await inputs.first().fill('Edited sample');
        assert(await form.getByRole('status').count()===0,`${path} stale result cleared after editing`);
      }
      if(path==='/wholesale') {
        await page.getByRole('button',{name:/WhatsApp Now/}).click();
        assert(await page.getByRole('dialog',{name:'WhatsApp — demo'}).isVisible(),'WhatsApp is informational');
        await page.keyboard.press('Escape');
      }
    }
    await go('/account/login');
    await page.getByRole('button',{name:'Log in',exact:true}).click();
    assert(await page.locator('.p1-login-form [role="alert"]').isVisible(),'Login validates empty input');
    await page.locator('[name="username"]').fill('sample@example.com');
    await page.locator('[name="password"]').fill('demo-only-not-a-credential');
    await page.getByRole('button',{name:'Show password',exact:true}).click();
    assert(await page.locator('[name="password"]').getAttribute('type')==='text','Show password');
    await page.getByRole('button',{name:'Hide password',exact:true}).click();
    await page.getByRole('button',{name:'Log in',exact:true}).click();
    assert((await page.locator('.p1-login-form [role="alert"]').innerText()).includes('Invalid demo credentials'),'Unknown accounts are rejected');
    await page.getByRole('link',{name:'Lost your password?',exact:true}).click();
    await page.getByRole('heading',{name:'Lost password',exact:true}).waitFor();
    await page.getByRole('link',{name:'Back to login',exact:true}).click();
    await page.getByRole('heading',{name:'My account',exact:true}).waitFor();
    assert(await page.locator('[name="password"]').inputValue()==='','Password not retained after navigation');
    const signup=page.locator('footer form');
    await signup.locator('input[type="email"]').fill('sample@example.com');
    await signup.getByRole('button',{name:'UNLOCK 10% OFF',exact:true}).click();
    assert((await signup.getByRole('status').innerText()).includes('no discount code'),'Signup does not invent a coupon');
    assert(!await page.evaluate(()=>Object.values(localStorage).some(v=>v.includes('sample@example.com')||v.includes('demo-only-not-a-credential')||v.includes('Sample demo'))),'No form values in localStorage');
    results.push({width,checks:'contact, lost password, subscription access, two wholesale forms, local affiliate application, login/show-hide, footer signup, invalid fields, no form persistence'});
  }
  page.off('pageerror',onError);page.off('request',onRequest);
  assert(!errors.length,errors.join('\n'));assert(!submissions.length,'No form submission requests');
  return {results,errors,submissions};
}
