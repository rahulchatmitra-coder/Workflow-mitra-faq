@echo off
echo Pushing FlowMitra to GitHub...
echo Repository: https://github.com/niravchatmitra/FlowMitra.git
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Checking git status...
git status
echo.

echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Check the output above for any errors.
echo If you see authentication prompts, follow them to complete the push.
pause
