# FlowMitra - AI Workflow Automation Platform

![FlowMitra](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

FlowMitra is a pixel-perfect clone of Gumloop's design, reimagined as an AI-powered workflow automation platform. Built with React and featuring stunning animations, floating elements, and a modern UI.

## ✨ Features

### 🎨 **Gumloop-Inspired Design**
- Pixel-perfect recreation of Gumloop's homepage design
- 20+ animated floating elements
- Smooth parallax mouse effects
- Gradient background blobs

### 🖱️ **Interactive Animations**
- **Animated Cursors**: Named cursors (Aron, Lizzy) with realistic movement
- **Floating Icons**: 10+ integration icons (Gmail, Slack, Sheets, etc.)
- **Avatar Faces**: 4 animated avatars with blinking eyes
- **Connection Lines**: Animated dashed lines connecting elements

### 📱 **Fully Responsive**
- Desktop, tablet, and mobile optimized
- Smooth transitions and hover effects
- Mobile menu with hamburger animation

### 🎯 **Design System**
- 200+ design tokens extracted from original SVGs
- Consistent spacing, colors, typography
- CSS variables for easy theming
- Dark mode support ready

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/niravchatmitra/FlowMitra.git
   cd FlowMitra
   ```

2. **Install dependencies**
   ```bash
   cd react-app
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
FlowMitra/
├── react-app/               # Main React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── HeroAnimated.jsx      # Hero with all animations
│   │   │   ├── Navigation.jsx        # Sticky navigation
│   │   │   ├── FlowMitraLogo.jsx    # Brand logo component
│   │   │   ├── Features.jsx          # Features section
│   │   │   └── Footer.jsx            # Footer component
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Solutions.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── styles/          # Global styles
│   │   │   └── tokens.css   # Design system tokens
│   │   ├── assets/          # Static assets
│   │   │   ├── icons/
│   │   │   ├── logos/
│   │   │   ├── cursors/
│   │   │   └── avatars/
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
├── Gumloop_ Build AI agents for work/  # Original SVG assets (69 files)
├── push-to-github.bat       # Helper script to push to GitHub
└── README.md
```

## 🎨 Design Tokens

The project uses a comprehensive design token system located in `src/styles/tokens.css`:

- **Colors**: Primary, secondary, text, borders, service brands
- **Typography**: Font families, sizes (xs to 6xl), weights, line heights
- **Spacing**: Consistent spacing scale (4px to 128px)
- **Shadows**: Multiple shadow levels for depth
- **Border Radius**: From sm to full rounded
- **Breakpoints**: Responsive design breakpoints

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📦 Build & Deploy

### Build for Production
```bash
cd react-app
npm run build
```

The build output will be in `react-app/dist/`

### Deploy to Vercel
```bash
npm install -g vercel
cd react-app
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
cd react-app
npm run build
netlify deploy --prod --dir=dist
```

## 🎭 Key Components

### HeroAnimated
The hero section featuring:
- Announcement banner with gradient
- 10 floating integration icons
- 4 animated avatar faces
- 2 animated cursors with names
- Connection lines
- Parallax mouse effects
- Gradient background blobs

### Navigation
Sticky navigation with:
- FlowMitra logo
- Desktop and mobile menus
- Smooth transitions
- Scroll effects

### FlowMitraLogo
Customizable logo component:
- Multiple sizes (sm, md, lg)
- Variants (full, icon-only)
- Themeable colors

## 🌈 Animations

All animations are carefully crafted to match Gumloop's feel:

- **Float animations**: 6-8s infinite ease-in-out
- **Cursor animations**: 5s smooth movements
- **Blink animations**: 4s eye blinking
- **Hover effects**: 0.3s ease transitions
- **Parallax**: Mouse-based position shifts

## 🖼️ SVG Assets

The project includes 69 original SVG files from Gumloop design:
- Integration logos (Google, Anthropic, OpenAI, etc.)
- UI icons (lock, search, chevron, etc.)
- Avatar shapes (circle, square, blob, triangle)
- Animated cursors
- Service logos (replaced with FlowMitra branding)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from [Gumloop](https://gumloop.com)
- Built with [React](https://react.dev) and [Vite](https://vitejs.dev)
- Icons and animations meticulously recreated

## 📧 Contact

**Nirav** - [@niravchatmitra](https://github.com/niravchatmitra)

Project Link: [https://github.com/niravchatmitra/FlowMitra](https://github.com/niravchatmitra/FlowMitra)

---

⭐ Star this repo if you like it!
