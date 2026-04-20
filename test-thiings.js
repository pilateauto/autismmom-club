const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  await page.goto('https://www.thiings.co/things', { waitUntil: 'networkidle' });
  
  // Inspect DOM structure deeper inside the full screen canvas layer
  const domTree = await page.evaluate(() => {
    // The "fixed h-full w-full bg-[#FEFCF7]" is the canvas wrapper
    const canvasWrapper = Array.from(document.body.children).find(el => el.className.includes("fixed h-full w-full bg-[#FEFCF7]"));
    
    if(!canvasWrapper) return "No wrapper found";
    
    return {
       children: Array.from(canvasWrapper.querySelectorAll('div')).filter(el => el.childElementCount > 2).map(el => ({
         className: el.className,
         style: el.getAttribute('style') || '',
         w: el.offsetWidth,
         h: el.offsetHeight,
         tag: el.tagName
       })).slice(0, 5)
    };
  });
  
  console.log(JSON.stringify(domTree, null, 2));
  
  await browser.close();
})();
