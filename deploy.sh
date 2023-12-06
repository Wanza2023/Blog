#!/bin/bash
# 디렉토리로 이동
cd /home/ubuntu/deploy

# Yarn을 사용하여 종속성 설치
yarn install

# 리액트 애플리케이션 빌드
yarn build

rm -rf /var/www/html/*

# 빌드된 파일들을 웹 루트 디렉토리로 이동
mv /home/ubuntu/deploy/build/* /var/www/html/

# PM2와 Nginx 재시작
npx pm2 reload all
service nginx restart