# Design Reference Guide

## 🎨 Visual Layout Overview

### Page Structure
```
┌─────────────────────────────────────┐
│         NAVIGATION (Sticky)          │
│  Logo    Links    [Sign in] [Start] │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│              HERO SECTION            │
│                                      │
│     Build AI agents that work       │
│            for you                   │
│                                      │
│        [Start building] [Demo]       │
│                                      │
│     10k+    500k+    99.9%          │
│    Active   Automations  Uptime      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          FEATURES SECTION            │
│   Everything you need to automate    │
│                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ No-code│ │ Smart  │ │ AI     │  │
│  │ builder│ │ integr.│ │ logic  │  │
│  └────────┘ └────────┘ └────────┘  │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Monitor│ │Schedule│ │Security│  │
│  └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│        TESTIMONIALS SECTION          │
│      Trusted by teams worldwide      │
│                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────┐│
│  │"Transform│ │"Intuitive│ │"Game │││
│  │operations│ │ interface│ │change│││
│  │ — Sarah" │ │ — Mike"  │ │— Jess│││
│  └──────────┘ └──────────┘ └──────┘│
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           CTA SECTION (Dark)         │
│   Ready to automate your workflow?   │
│                                      │
│    [Get started] [Talk to sales]     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│              FOOTER                  │
│  Logo   Product  Company  Resources  │
│         Links    Links    Links      │
│                                      │
│  © 2024 FlowMitra  [Social icons]   │
└─────────────────────────────────────┘
```

## 📱 Responsive Behavior

### Desktop (1200px+)
- Full navigation visible
- Multi-column layouts
- Larger typography
- Hover effects active

### Tablet (768-1024px)
- Navigation still visible
- 2-column feature grid
- Adjusted spacing
- Touch-friendly sizing

### Mobile (<768px)
- Hamburger menu
- Single column layout
- Stacked components
- Larger tap targets

## 🎨 Color Usage

### Light Mode (Default)
```
Background: White (#ffffff)
Text: Near-black (lab color)
Borders: Light gray
Accents: Black buttons
```

### Interactive States
```
Default:  Normal appearance
Hover:    Transform + shadow
Focus:    2px outline
Active:   Pressed state
Disabled: 50% opacity
```

## 🔤 Typography Hierarchy

```
Hero Title:       60px / Bold / Tight leading
Section Titles:   36px / Bold / Tight leading
Feature Titles:   20px / Semibold / Tight leading
Body Large:       18px / Regular / Relaxed leading
Body:             16px / Regular / Base leading
Body Small:       14px / Regular / Base leading
Caption:          12px / Regular / Base leading
```

## 📐 Spacing Examples

### Component Spacing
```
Hero padding:       128px (64px mobile)
Section padding:    128px (64px tablet, 48px mobile)
Card padding:       40px (32px tablet, 16px mobile)
Element gap:        32px (16px mobile)
```

### Micro Spacing
```
Button padding:     10px 32px (vertical, horizontal)
Icon to text:       8px
Label to input:     4px
Card content:       16px internal padding
```

## 🎭 Animation Details

### Scroll Animations
- **Trigger**: Element enters viewport + 100px offset
- **Effect**: Fade in from bottom (20px translateY)
- **Duration**: 300ms
- **Easing**: ease-out
- **Stagger**: 50ms between elements

### Hover Effects
- **Cards**: translateY(-2px) + shadow increase
- **Buttons**: translateY(-1px) + shadow
- **Duration**: 200ms
- **Easing**: ease-default

### Focus States
- **Outline**: 2px solid
- **Offset**: 2px
- **Border radius**: 6px
- **Duration**: Instant (150ms)

## 🧩 Component Details

### Navigation Bar
```
Height: 64px
Background: White with 95% opacity
Backdrop filter: 12px blur
Border bottom: 1px solid border-default
Shadow: Applied on scroll
Position: Sticky top
```

### Button Styles
```
Primary:
  Background: Black
  Text: White
  Padding: 10px 32px
  Radius: 8px
  Shadow: sm (on hover: md)

Secondary:
  Background: Off-white
  Text: Primary
  Border: 1px solid border-default
  Same sizing as primary

Ghost:
  Background: Transparent
  Text: Secondary color
  Hover: Background muted
```

### Feature Cards
```
Background: White
Border: 1px solid border-default
Border radius: 14px
Padding: 40px
Hover: 
  - Transform: translateY(-2px)
  - Shadow: md
  - Border: border-strong
Transition: 300ms ease
```

### Icon Style
```
Size: 24px (features), 20px (buttons)
Stroke width: 2px
Color: currentColor
Background circle: 48x48px
Border radius: 8px
Background: surface-muted
```

## 🎯 Interactive Areas

### Clickable Elements
- Minimum size: 44x44px (WCAG AAA)
- Touch target: 48x48px recommended
- Gap between: 8px minimum
- Visual feedback: Always present

### Focus Order
1. Skip link (hidden, revealed on focus)
2. Logo
3. Navigation links
4. Action buttons
5. Main content (tab through)
6. Footer links
7. Social links

## 📏 Grid Systems

### Features Grid
```css
Desktop: repeat(auto-fit, minmax(300px, 1fr))
Tablet:  2 columns
Mobile:  1 column
Gap:     32px (desktop), 24px (tablet), 12px (mobile)
```

### Footer Grid
```css
Desktop: 2fr 1fr 1fr 1fr 1fr (5 columns)
Tablet:  2fr 1fr 1fr (3 columns)
Mobile:  1fr (single column)
Gap:     32px (desktop), 24px (tablet/mobile)
```

## 🎨 Shadow System

### Small Shadow (cards at rest)
```
rgba(0, 0, 0, 0.05) 0px 1px 2px 0px
```

### Medium Shadow (cards on hover)
```
Multiple layers:
- 0px 0px 0px 1px rgba(0,0,0,0.04)
- 0px 1px 1px -0.5px rgba(0,0,0,0.024)
- 0px 3px 3px -1.5px rgba(0,0,0,0.024)
- 0px 6px 6px -3px rgba(0,0,0,0.02)
- 0px 12px 12px -6px rgba(0,0,0,0.02)
- 0px 24px 24px -12px rgba(0,0,0,0.02)
```

## 🔍 Visual Polish

### Border Radius Consistency
- Cards: 14px
- Buttons: 8px
- Icons: 8px (container)
- Inputs: 6px
- Large containers: 16px

### Opacity Values
- Disabled: 50%
- Secondary text: Uses lab color
- Icon backgrounds: 10%
- Hover overlays: 80-95%

### Transitions
- All interactive: 200ms
- Layouts: 300ms
- Micro: 150ms
- Never on initial load

---

**Color Precision**: Using lab() color space for accurate rendering
**Typography**: Inter font family (professional, readable)
**Spacing**: 8px base unit (multiples of 2)
**Consistency**: Design tokens ensure uniformity
