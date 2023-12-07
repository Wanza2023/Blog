#!/bin/bash
# 디렉토리로 이동
cd /home/ubuntu/deploy

# Yarn을 사용하여 종속성 설치
sudo npm install

# 리액트 애플리케이션 빌드
sudo npm run build

# 빌드 결과 확인 및 이동
if [ -d "build" ]; then
    # 빌드된 파일들을 웹 루트 디렉토리로 이동
    sudo mv build/* /var/www/html/
else
    echo "빌드 디렉토리가 존재하지 않습니다."
fi

# PM2와 Nginx 재시작
sudo npx pm2 reload all
sudo service nginx restart
