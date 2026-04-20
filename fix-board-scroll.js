const fs = require('fs');

let path = '/Users/claudemonet/.openclaw/workspace/projects/autismmom-club/src/components/StickyBoard.tsx';
let txt = fs.readFileSync(path, 'utf-8');

txt = txt.replace(
  'import { useDrag } from "@use-gesture/react";',
  'import { useDrag, useWheel } from "@use-gesture/react";'
);

txt = txt.replace(
  '  // Set up react-use-gesture for dragging the background\n  const bindDrag = useDrag(({ down, movement: [mx, my], offset: [ox, oy], event, tap }) => {\n    // If we\\'re clicking a button or typing, don\\'t drag the background\n    if ((event.target as HTMLElement).closest(\\'button, input, textarea, .sticky-note\\')) return;\n    \n    setIsPanning(down);\n    \n    if (!placingNote) {\n      x.set(ox);\n      y.set(oy);\n    }\n  }, { \n    from: () => [x.get(), y.get()],\n    filterTaps: true,\n    bounds: { left: -5000 + (typeof window !== "undefined" ? window.innerWidth : 1000), right: 0, top: -5000 + (typeof window !== "undefined" ? window.innerHeight : 1000), bottom: 0 }\n  });',
  `  // Set up react-use-gesture for dragging AND mousewheel scrolling the background
  const bindDrag = useDrag(({ down, offset: [ox, oy], event }) => {
    // If we're clicking a button or typing, don't drag the background
    if ((event.target as HTMLElement).closest('button, input, textarea, .sticky-note')) return;
    
    setIsPanning(down);
    
    if (!placingNote) {
      x.set(ox);
      y.set(oy);
    }
  }, { 
    from: () => [x.get(), y.get()],
    filterTaps: true,
    bounds: { left: -5000 + (typeof window !== "undefined" ? window.innerWidth : 1000), right: 0, top: -5000 + (typeof window !== "undefined" ? window.innerHeight : 1000), bottom: 0 }
  });

  const bindWheel = useWheel(({ offset: [ox, oy], event }) => {
    // Stop the page from literally scrolling
    if (event) event.preventDefault();
    
    if (!placingNote) {
      x.set(ox);
      y.set(oy);
    }
  }, {
    from: () => [x.get(), y.get()],
    bounds: { left: -5000 + (typeof window !== "undefined" ? window.innerWidth : 1000), right: 0, top: -5000 + (typeof window !== "undefined" ? window.innerHeight : 1000), bottom: 0 },
    preventScroll: true
  });`
);

txt = txt.replace(
  '        {...(!placingNote ? bindDrag() : {})}',
  '        {...(!placingNote ? { ...bindDrag(), ...bindWheel() } : {})}'
);

// Double the canvas size by zooming it out with a scale wrapper
txt = txt.replace(
  '          className="w-[5000px] h-[5000px] absolute will-change-transform"',
  '          className="w-[10000px] h-[10000px] absolute will-change-transform"'
);

txt = txt.replace(
  '          style={{\n            x: smoothX, y: smoothY,\n            backgroundImage: \\'radial-gradient(circle, #000000 1px, transparent 1px)\\',\n            backgroundSize: \\'48px 48px\\',\n            backgroundPosition: \\'0 0\\',\n          }}',
  '          style={{\n            x: smoothX, y: smoothY,\n            backgroundImage: \\'radial-gradient(circle, #000000 1px, transparent 1px)\\',\n            backgroundSize: \\'48px 48px\\',\n            backgroundPosition: \\'0 0\\',\n            scale: 0.5,\n            transformOrigin: "top left"\n          }}'
);

txt = txt.replace(
  'bounds: { left: -5000 +',
  'bounds: { left: -10000 +',
);
txt = txt.replace(
  'top: -5000 +',
  'top: -10000 +'
);

txt = txt.replace(
  'bounds: { left: -5000 +',
  'bounds: { left: -10000 +',
);
txt = txt.replace(
  'top: -5000 +',
  'top: -10000 +'
);

fs.writeFileSync(path, txt);

