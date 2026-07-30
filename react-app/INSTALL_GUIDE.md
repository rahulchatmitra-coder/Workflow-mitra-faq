# Installation Guide

## Prerequisites

You need Node.js installed on your system.

### Check if Node.js is installed:
```powershell
node --version
npm --version
```

If not installed, download from: https://nodejs.org/ (LTS version recommended)

## Installation Steps

### Step 1: Open PowerShell
Right-click on PowerShell and select "Run as Administrator"

### Step 2: Navigate to project
```powershell
cd C:\Users\DELL\Desktop\FlowMitra\react-app
```

### Step 3: Install dependencies
```powershell
npm install
```

This will install:
- React 18.2.0
- React DOM 18.2.0
- Vite 5.0.8
- Vite React Plugin

### Step 4: Start development server
```powershell
npm run dev
```

The app will open at: **http://localhost:3000**

## Troubleshooting

### Error: "npm is not recognized"
- Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/

### Error: "execution policy"
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Port 3000 already in use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to any available port
}
```

## Alternative: Use Plain HTML Version

If you have issues with Node.js, use the plain HTML version at:
```
C:\Users\DELL\Desktop\FlowMitra\index.html
```

Just double-click it to open in your browser!

## Build for Production

```powershell
npm run build
```

This creates an optimized build in the `dist` folder.

## Deploy

After building, upload the `dist` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service
