const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.thiings.co/things', { waitUntil: 'networkidle' });
  
  // Inspect the canvas state and classNames from the DOM tree
  const info = await page.evaluate(() => {
    // the main element wrapping everything
    const mainWrapper = document.querySelector('main') || document.body;
    
    // Check if body is scrollable or locked
    const bodyOverflow = window.getComputedStyle(document.body).overflow;
    
    // find the layer that handles the panning (usually a very large div or one with a transform matrix)
    const allDivs = Array.from(document.querySelectorAll('div'));
    
    const transformedDivs = allDivs.filter(el => {
      const style = window.getComputedStyle(el);
      return style.transform !== 'none' && style.transform.includes('matrix');
    }).map(el => ({
      className: el.className,
      transform: window.getComputedStyle(el).transform,
      width: window.getComputedStyle(el).width,
      height: window.getComputedStyle(el).height,
      position: window.getComputedStyle(el).position
    }));
    
    // check window event listeners if possible (not directly possible but we can check inline styles reacting to mouse)
    return {
      bodyOverflow,
      transformedDivs: transformedDivs.slice(0, 3), // just the top 3
      reactRoot: !!document.querySelector('#__next') || !!document.querySelector('#root')
    };
  });
  
  console.log(JSON.stringify(info, null, 2));
  
  await browser.close();
})();
