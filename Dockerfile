# 이미지의 기반은 Node.js를 포함한 이미지로 설정
FROM node:14

# 작업 디렉토리를 설정
WORKDIR /app
# 소스 코드 및 package.json 복사

COPY package.json .
# npm 패키지 설치

RUN npm install

# 소스 코드를 작업 디렉토리로 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# Nginx를 기반으로한 이미지로 변경
FROM nginx

# 작업 디렉토리를 설정
WORKDIR /app

# 빌드된 React 애플리케이션을 Nginx의 정적 파일 디렉토리로 복사
COPY --from=0 /app/build /usr/share/nginx/html

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# # nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 Nginx 설정 파일을 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]