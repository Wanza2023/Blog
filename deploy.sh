#!/bin/bash
# 배포된 파일들을 웹 루트 디렉토리로 이동
mv /home/ubuntu/deploy/* /var/www/html/

# 디렉토리로 이동
cd /home/ubuntu/deploy

# Yarn을 사용하여 종속성 설치
yarn install

# PM2를 사용하여 애플리케이션 재시작
npx pm2 reload all

# Nginx 재시작
service nginx restart
