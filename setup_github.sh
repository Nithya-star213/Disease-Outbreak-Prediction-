#!/bin/bash
# PulseWatch India - GitHub Repository Initializer Script

echo "=========================================================="
echo "  PulseWatch India - GitHub Repository Initialization"
echo "=========================================================="

# 1. Initialize Git repository
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "Initial release of PulseWatch India Outbreak Intelligence Platform"

# 4. Prompt for GitHub repository URL
echo ""
echo "Step 1: Go to https://github.com/new and create a new repository named 'pulsewatch-india'."
echo "Step 2: Copy the HTTPS or SSH repository URL."
echo "Step 3: Run the following commands in your terminal:"
echo ""
echo "  git branch -M main"
echo "  git remote add origin YOUR_GITHUB_REPOSITORY_URL"
echo "  git push -u origin main"
echo ""
echo "Done! Your PulseWatch India platform will be live on GitHub!"
echo "=========================================================="
