Write-Host "Pushing code to GitHub..." -ForegroundColor Cyan

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "Adding remote repository..." -ForegroundColor Yellow
    git remote add origin https://github.com/niravchatmitra/FlowMitra.git
}

# Push to GitHub
Write-Host "Pushing to main branch..." -ForegroundColor Yellow
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Code pushed successfully to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/niravchatmitra/FlowMitra" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Please check your credentials and try again." -ForegroundColor Red
}

pause
