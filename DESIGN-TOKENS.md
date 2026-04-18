# Design Tokens — Autism Mom Club

## Global Theme
- [ ] Dark Mode
- [x] Light Mode
- [ ] Toggle Available

## Colors

### Primary Palette
- `background`: `#FAFAF7` (warm off-white)
- `foreground`: `#1A1A1A` (near-black)
- `surface`: `#F2F2EE` (secondary light grey)
- `border`: `#E5E5E0`

### Accents (Neurodiversity Gradient)
- `gradient-start`: `#E6A8B5` (soft pink)
- `gradient-via-1`: `#E6B89E` (soft orange)
- `gradient-via-2`: `#E6D89E` (soft yellow)
- `gradient-via-3`: `#A8E6B5` (soft green)
- `gradient-via-4`: `#9EE6D8` (soft teal)
- `gradient-end`: `#9EB5E6` (soft blue)
*Rule: Gradient must only be used for the logo text, a single primary CTA button per page, and subtle section divider lines (e.g., 2px height).*

## Typography

### Fonts
- `font-sans`: `'Space Grotesk', sans-serif` (Display/Headlines)
- `font-serif`: `'Source Serif Pro', serif` (Body/Readable elements - humanist fallback)
- `font-body`: `'Inter', sans-serif` (UI elements, buttons, tags)

### Sizing Scale
- `text-xs`: 0.75rem (12px) - Used for age/support tags
- `text-sm`: 0.875rem (14px) - Used for metadata, small links
- `text-base`: 1.125rem (18px) - Used for body copy (slightly larger for readability)
- `text-lg`: 1.25rem (20px) - Used for sub-headers
- `text-xl`: 1.5rem (24px) - Used for card titles
- `text-3xl`: 2rem (32px) - Used for section headers
- `text-5xl`: 3rem (48px) - Used for hero headlines
- `text-7xl`: 4.5rem (72px) - Used for massive hero statements

## Spacing & Layout
- `max-w`: `max-w-6xl` (1152px)
- `section-padding-y`: `py-24` (96px) for major sections
- `container-padding-x`: `px-6 md:px-12`

## Components

### Buttons
- **Primary:** Gradient background (pink to blue, desaturated), white text `#FFFFFF`, rounded-full, px-8 py-3, hover: opacity 90, scale 1.02 transition.
- **Secondary:** Surface background `#F2F2EE`, foreground text `#1A1A1A`, border `#E5E5E0` 1px, rounded-full, px-8 py-3.

### Cards
- Background: `#FFFFFF`
- Border: 1px solid `#E5E5E0`
- Shadow: none (flat design)
- Corner: rounded-2xl

### Tags (Age/Needs)
- Background: `#F2F2EE`
- Text: `#1A1A1A`
- Border: 1px solid `#E5E5E0`
- Corner: rounded-full
- Padding: px-3 py-1

## Hard Rules
- NO puzzle pieces.
- NO red-dominant palettes.
- NEVER use gradient as a background wash.
