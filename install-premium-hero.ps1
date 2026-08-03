# Premium Hero Installation Script
Write-Host "Installing Premium Hero dependencies..." -ForegroundColor Cyan

# Install Framer Motion
Write-Host "`nInstalling Framer Motion..." -ForegroundColor Yellow
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install framer-motion

Write-Host "`n✅ Installation complete!" -ForegroundColor Green
Write-Host "`nTo view the Premium Hero:" -ForegroundColor Cyan
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Open: http://localhost:3000/premium" -ForegroundColor White
Write-Host "`n🎉 Enjoy the premium animations!" -ForegroundColor Magenta
