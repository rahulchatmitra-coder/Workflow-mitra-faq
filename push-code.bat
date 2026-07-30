@echo off
echo Pushing code to GitHub...
git add .
git commit -m "Add Premium Hero with Framer Motion - interactive agents showcase"
git branch -M main
git push -u origin main --force
echo.
echo Done! Check https://github.com/niravchatmitra/FlowMitra
pause
