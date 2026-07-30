# FlowMitra React - Gumloop-Inspired Design

A modern React application inspired by Gumloop's design with animated floating icons and clean UI.

## 🚀 Quick Start

### Install Dependencies
```bash
cd react-app
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ✨ Features

- **Animated Floating Icons**: Service icons that float around the hero section
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, minimal design inspired by Gumloop
- **Fast Performance**: Built with Vite for instant HMR
- **Accessible**: Keyboard navigation and ARIA labels

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Header navigation
│   │   ├── Hero.jsx             # Hero section
│   │   ├── FloatingIcon.jsx     # Animated icon component
│   │   ├── Navigation.css
│   │   ├── Hero.css
│   │   └── FloatingIcon.css
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & tokens
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Design Features

### Floating Icons
- Gmail, GitHub, Slack, Teams, Mailchimp, Notion
- Google Drive, Sheets, Calendar
- HubSpot, Salesforce, Snowflake
- Smooth floating animations
- Hover effects with labels
- Responsive positioning

### Navigation
- Sticky header with backdrop blur
- Announcement banner
- Mobile hamburger menu
- CTA buttons

### Hero Section
- Large, bold typography
- Highlighted text effect
- Dual CTA buttons
- Gradient background

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **CSS3** - Styling with design tokens
- **Modern JavaScript** - ES6+ features

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## ⚡ Performance

- Fast Refresh with Vite
- Optimized animations
- Reduced motion support
- Lazy loading ready

## 🎯 Customization

### Change Colors
Edit `src/index.css` design tokens:
```css
:root {
  --color-primary: #000000;
  --color-text-primary: #0a0a0a;
  /* ... */
}
```

### Add More Icons
Edit `src/components/Hero.jsx`:
```javascript
const icons = [
  { name: 'YourApp', icon: 'A', color: '#FF0000', position: { top: '10%', left: '10%' }, delay: 0 },
  // ... add more
]
```

### Modify Animations
Edit `src/components/FloatingIcon.css`:
```css
@keyframes float {
  /* Customize animation */
}
```

## 📄 License

MIT - Feel free to use for your projects!

---

Built with ❤️ using React and Vite
