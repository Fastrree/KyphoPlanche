# KyphoPlanche Deployment Script (Windows PowerShell)

Write-Host "🚀 KyphoPlanche Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install git first." -ForegroundColor Red
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Not a git repository. Run 'git init' first." -ForegroundColor Red
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Uncommitted changes detected. Committing..." -ForegroundColor Yellow
    git add .
    $commitMessage = Read-Host "Enter commit message"
    git commit -m "$commitMessage"
} else {
    Write-Host "✅ No uncommitted changes." -ForegroundColor Green
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://vercel.com/dashboard"
    Write-Host "2. Click 'Add New Project'"
    Write-Host "3. Import your GitHub repository"
    Write-Host "4. Add environment variables:"
    Write-Host "   - DATABASE_URL (PostgreSQL from Neon/Supabase)"
    Write-Host "   - NODE_ENV=production"
    Write-Host "   - SESSION_SECRET (random string)"
    Write-Host "5. Click 'Deploy'"
    Write-Host ""
    Write-Host "📚 See DEPLOYMENT.md for detailed instructions." -ForegroundColor Cyan
} else {
    Write-Host "❌ Failed to push to GitHub." -ForegroundColor Red
    Write-Host "Check your git configuration and try again."
    exit 1
}
