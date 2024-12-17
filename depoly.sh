#!/bin/bash

# Step 1: 前端打包
echo "Building the frontend..."
npm run build

# Step 2: 將原始碼更新至 Github／Gitlab
echo "Updating source code to GitHub/GitLab..."
git add .
current_date=$(date +"%Y-%m-%d")
git commit -m "$current_date"
git push origin main

# Step 3: 將打包內容更新至 VPS
echo "Updating built files to VPS..."

# SSH 連線測試
ssh -q root@64.176.37.84 exit
if [ $? -ne 0 ]; then
    echo "Error: Cannot connect to VPS via SSH"
    exit 1
fi

# 清空目標資料夾
echo "Clearing the target directory on VPS..."
ssh root@64.176.37.84 'rm -rf /var/www/furniture_website/html/*'
if [ $? -ne 0 ]; then
    echo "Error: Failed to clear the target directory on VPS"
    exit 1
fi

# SCP 傳輸檔案
scp -r dist/* root@64.176.37.84:/var/www/furniture_website/html/
if [ $? -eq 0 ]; then
    echo "Files successfully copied to VPS"
else
    echo "Error: Failed to copy files to VPS"
    exit 1
fi
