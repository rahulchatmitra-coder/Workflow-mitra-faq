# Testing Guide

## 🚀 Quick Start Testing

### Open the Website

**Option 1: Direct Open**
```bash
# Simply double-click index.html
# or right-click → Open With → Browser
```

**Option 2: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## ✅ Manual Testing Checklist

### Visual Testing

#### Desktop (1200px+)
- [ ] Page loads without errors
- [ ] All sections visible and styled
- [ ] Navigation bar sticky
- [ ] All fonts loaded correctly
- [ ] Icons rendered properly
- [ ] Colors match design system
- [ ] Spacing looks consistent
- [ ] No horizontal scroll

#### Tablet (768-1024px)
- [ ] Responsive layout adjusts
- [ ] Feature cards in 2 columns
- [ ] Typography scales appropriately
- [ ] Navigation still horizontal
- [ ] Touch targets adequate
- [ ] Footer adjusts to 3 columns

#### Mobile (<768px)
- [ ] Single column layout
- [ ] Hamburger menu appears
- [ ] Typography readable
- [ ] Buttons full width
- [ ] Stats stack vertically
- [ ] Footer single column
- [ ] No text overflow

### Interactive Testing

#### Navigation
- [ ] Logo links to home
- [ ] All nav links work
- [ ] Smooth scroll to sections
- [ ] Mobile menu opens/closes
- [ ] Escape closes mobile menu
- [ ] Clicking link closes mobile menu
- [ ] Navigation stays sticky on scroll

#### Buttons
- [ ] All buttons clickable
- [ ] Hover effects work
- [ ] Ripple effect visible on click
- [ ] Focus indicators visible
- [ ] Active states work

#### Cards
- [ ] Feature cards hover effect
- [ ] 3D tilt on mouse move
- [ ] Testimonial cards hover
- [ ] Cards clickable if needed
- [ ] Smooth transitions

#### Animations
- [ ] Cards fade in on scroll
- [ ] Animations staggered
- [ ] Smooth and not jarring
- [ ] Respect reduced motion
- [ ] No layout shift

### Keyboard Testing

#### Navigation Flow
```
1. Press Tab repeatedly
2. Verify focus order:
   - Skip link (press Enter to test)
   - Logo
   - Nav links
   - Buttons
   - Main content
   - Footer links
3. All focus indicators visible
4. No keyboard traps
```

#### Shortcuts
- [ ] Alt+H focuses header
- [ ] Alt+M focuses main content
- [ ] Alt+F focuses footer
- [ ] All shortcuts work

#### Mobile Menu
- [ ] Tab to hamburger button
- [ ] Enter/Space opens menu
- [ ] Escape closes menu
- [ ] Tab through menu items
- [ ] Enter activates links

### Accessibility Testing

#### Screen Reader (Windows: NVDA)
```bash
# Download NVDA: https://www.nvaccess.org/
1. Install and start NVDA
2. Navigate with Tab
3. Check announcements:
   - All interactive elements announced
   - Role of elements clear
   - Link purposes understood
   - Button labels descriptive
   - Landmarks announced
```

#### Screen Reader (Mac: VoiceOver)
```bash
# Press Cmd+F5 to start VoiceOver
1. Use VO+Right Arrow to navigate
2. Verify:
   - Headings structure clear
   - Lists properly announced
   - Images have alt text (or aria-hidden)
   - Form labels connected
```

#### Color Contrast
- [ ] Text on white: passes AA
- [ ] Text on black: passes AA
- [ ] Button text readable
- [ ] Link text distinguishable
- [ ] Focus indicators visible

#### Zoom Testing
- [ ] Zoom to 200%
- [ ] Text remains readable
- [ ] No horizontal scroll
- [ ] Layouts don't break
- [ ] All content accessible

### Browser Testing

#### Chrome/Edge
```
✓ Latest version
✓ Previous major version
- Test all features
- Check DevTools console (no errors)
- Verify smooth animations
- Check Web Vitals
```

#### Firefox
```
✓ Latest version
- Verify layout consistency
- Test all interactions
- Check console (no errors)
```

#### Safari
```
✓ Latest version
- Verify iOS Safari
- Test on real device if possible
- Check webkit-specific issues
```

### Performance Testing

#### Lighthouse Audit
```bash
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
4. Target scores:
   - Performance: 95+
   - Accessibility: 100
   - Best Practices: 95+
   - SEO: 90+
```

#### Network Tab
```bash
1. Open DevTools → Network
2. Reload page
3. Check:
   - Total requests: ~4
   - Total size: <100KB
   - Load time: <2s
   - No failed requests
   - Fonts loading
```

#### Performance Tab
```bash
1. Open DevTools → Performance
2. Record page load
3. Check:
   - No long tasks (>50ms)
   - Smooth frame rate
   - No layout thrashing
   - Efficient animations
```

## 🤖 Automated Testing

### HTML Validation
```bash
# Visit: https://validator.w3.org/
1. Upload index.html
2. Check for errors
3. Fix any issues
4. Re-validate
```

### CSS Validation
```bash
# Visit: https://jigsaw.w3.org/css-validator/
1. Upload styles.css
2. Check for errors
3. Verify no warnings (or acceptable ones)
```

### Accessibility Testing
```bash
# Using axe DevTools
1. Install extension: axe DevTools
2. Open in DevTools
3. Run scan
4. Target: 0 violations
5. Fix any issues
```

### WAVE Testing
```bash
# Visit: https://wave.webaim.org/
1. Enter URL or upload
2. Review:
   - Errors: 0
   - Contrast: Pass
   - Alerts: Review
   - Features: Good
```

## 📱 Mobile Device Testing

### Real Device Testing
```
Priority devices:
- iPhone 12/13/14 (iOS Safari)
- Samsung Galaxy S21+ (Chrome)
- iPad (latest) (Safari)

Tests:
- Touch interactions
- Scroll behavior
- Font rendering
- Button tap targets
- Mobile menu
- Orientation change
```

### Browser DevTools
```bash
1. Open Chrome DevTools
2. Click device toolbar (Ctrl+Shift+M)
3. Test devices:
   - iPhone 12 Pro (390x844)
   - iPad Air (820x1180)
   - Samsung Galaxy S20 (360x800)
   - Nest Hub (1024x600)
```

## 🔍 Visual Regression Testing

### Screenshot Comparison
```bash
# Manual process:
1. Take screenshots of key pages
2. Make changes
3. Compare screenshots
4. Verify intentional changes only
```

### Checklist
- [ ] Hero section renders correctly
- [ ] Feature cards aligned
- [ ] Testimonials layout
- [ ] Footer columns proper
- [ ] Navigation consistent
- [ ] Buttons styled correctly

## ⚡ Performance Metrics

### Core Web Vitals
```
Target values:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
```

### Test with DevTools
```bash
1. Open DevTools → Console
2. Page should log metrics
3. Verify:
   - LCP: Hero title/image
   - FID: First button click
   - CLS: Should be 0 or near 0
```

### WebPageTest
```bash
# Visit: https://www.webpagetest.org/
1. Enter URL
2. Choose location
3. Run test
4. Review:
   - Load time
   - First byte
   - Start render
   - Filmstrip view
```

## 🐛 Common Issues to Check

### Layout Issues
- [ ] No unexpected scrollbars
- [ ] Content doesn't overflow
- [ ] Cards equal height
- [ ] Spacing consistent
- [ ] Alignment proper

### JavaScript Issues
- [ ] No console errors
- [ ] Event listeners working
- [ ] Animations smooth
- [ ] No memory leaks
- [ ] Mobile menu functional

### CSS Issues
- [ ] Fonts loading
- [ ] Colors correct (lab support)
- [ ] Hover states work
- [ ] Responsive breakpoints
- [ ] Print styles work

### Accessibility Issues
- [ ] Focus visible
- [ ] Skip links work
- [ ] ARIA attributes correct
- [ ] Headings hierarchical
- [ ] Alt text present

## 📝 Bug Reporting Template

```markdown
### Bug Report

**Environment:**
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen size: [1920x1080]
- Device: [Desktop]

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. Scroll to...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[Attach if relevant]

**Console Errors:**
[Any errors in console]

**Additional Context:**
[Any other details]
```

## ✨ Test Scenarios

### User Journey 1: Quick Start
```
1. Land on homepage
2. Read hero message
3. Click "Start building for free"
4. Verify button action
5. Check smooth experience
```

### User Journey 2: Learn More
```
1. Scroll to features
2. Hover over cards
3. Read descriptions
4. Scroll to testimonials
5. Read reviews
6. Click "Get started"
```

### User Journey 3: Mobile User
```
1. Visit on mobile
2. Open menu
3. Navigate to section
4. Close menu
5. Fill contact form (if present)
6. Submit
```

## 🎯 Acceptance Criteria

### Must Pass
- ✅ No console errors
- ✅ All links functional
- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ Mobile responsive
- ✅ Performance >90
- ✅ Accessibility 100

### Should Pass
- ✅ Smooth animations
- ✅ Cross-browser consistent
- ✅ Fast load time (<3s)
- ✅ Small file size (<200KB)
- ✅ SEO optimized

### Nice to Have
- ✅ Print-friendly
- ✅ Dark mode ready
- ✅ Offline capability
- ✅ PWA installable

---

**Testing Status**: Ready for QA
**Last Tested**: Pending
**Test Coverage**: 100% manual, automated recommended
