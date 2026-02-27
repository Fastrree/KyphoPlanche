#!/bin/bash

# KyphoPlanche Deployment Script (Linux/Mac)

echo "🚀 KyphoPlanche Deployment Script"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Not a git repository. Run 'git init' first."
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    read -p "Enter commit message: " commit_message
    git commit -m "$commit_message"
else
    echo "✅ No uncommitted changes."
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Click 'Add New Project'"
    echo "3. Import your GitHub repository"
    echo "4. Add environment variables:"
    echo "   - DATABASE_URL (PostgreSQL from Neon/Supabase)"
    echo "   - NODE_ENV=production"
    echo "   - SESSION_SECRET (random string)"
    echo "5. Click 'Deploy'"
    echo ""
    echo "📚 See DEPLOYMENT.md for detailed instructions."
else
    echo "❌ Failed to push to GitHub."
    echo "Check your git configuration and try again."
    exit 1
fi
