const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.thiings.co/things', { waitUntil: 'networkidle' });
  
  // Inspect specific script tags to find their framework
  const stack = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
    const hasNext = !!document.querySelector('script[src*="_next"]');
    const hasSvelte = !!document.querySelector('script[src*="_svelte"]');
    const hasVite = !!document.querySelector('script[src*="vite"]');
    
    // Attempt to grab the exact class names on the main canvas layer
    const canvas = document.querySelector('.fixed.h-full.w-full');
    const child = canvas ? canvas.firstElementChild : null;
    
    return {
      scripts: scripts.filter(s => s).slice(0, 5),
      frameworks: { next: hasNext, svelte: hasSvelte, vite: hasVite },
      canvasClasses: canvas ? canvas.className : null,
      childStyle: child ? child.getAttribute('style') : null
    };
  });
  
  console.log(JSON.stringify(stack, null, 2));
  
  await browser.close();
})();
