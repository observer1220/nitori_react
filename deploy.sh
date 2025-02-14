#!/bin/bash

# Function to display error messages
function error_exit {
    echo "$1" 1>&2
    echo "Press any key to exit..."
    read -n 1
    exit 1
}

# Step 1: 前端打包
echo "Building the frontend..."
npm run build || error_exit "Error: Frontend build failed"

# Step 2: 將原始碼更新至 Github／Gitlab
echo "Updating source code to GitHub/GitLab..."
git add . || error_exit "Error: Git add failed"
current_date=$(date +"%Y-%m-%d")
git commit -m "$current_date" || error_exit "Error: Git commit failed"
git push origin main || error_exit "Error: Git push failed"

# Step 3: 將打包內容更新至 VPS
echo "Updating built files to VPS..."

# 清空目標資料夾
echo "Clearing the target directory on VPS..."
ssh root@64.176.37.84 'rm -rf /var/www/furniture_website/html/*'
if [ $? -ne 0 ]; then
    error_exit "Error: Failed to clear the target directory on VPS"
fi

# SCP 傳輸檔案
echo "Copying files to VPS..."
scp -r dist/* root@64.176.37.84:/var/www/furniture_website/html/
if [ $? -ne 0 ]; then
    error_exit "Error: Failed to copy files to VPS"
else
    echo "Files successfully copied to VPS"
fi

echo "Script executed successfully. Press any key to exit..."
read -n 1
