@echo off
cd /d "c:\Users\DELL\Desktop\FlowMitra"
git init
git add .
git commit -m "Initial commit - FlowMitra website"
git branch -M main
git remote add origin https://github.com/chatmitra/workflowmitra_website.git
git push -u origin main
