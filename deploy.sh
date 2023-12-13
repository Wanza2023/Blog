# #!/bin/bash
# # 디렉토리로 이동
# cd /home/ubuntu/deploy

# # 종속성 설치
# npm install

# # 리액트 애플리케이션 빌드
# npm run build

# # 빌드된 파일들을 웹 루트 디렉토리로 이동
# rsync -av --delete /home/ubuntu/deploy/build/ /var/www/html/

# # PM2와 Nginx 재시작
# sudo npx pm2 reload all
# sudo service nginx restart
