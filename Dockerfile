# FROM node:14
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]

# # nginx 이미지를 사용합니다.
# FROM nginx

# # work dir 고정
# WORKDIR /app

# # work dir 에 build 폴더 생성 /app/build
# RUN mkdir ./build

# # host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
# ADD ./build ./build

# # # nginx 의 default.conf 를 삭제
# RUN rm /etc/nginx/conf.d/default.conf

# # host pc 의 nginx.conf 를 아래 경로에 복사
# COPY ./nginx.conf /etc/nginx/conf.d

# # 80 포트 오픈
# EXPOSE 80

# # container 실행 시 자동으로 실행할 command. nginx 시작함
# CMD ["nginx", "-g", "daemon off;"]

# # 이미지의 기반은 Node.js를 포함한 이미지로 설정
# FROM node:14

# # 작업 디렉토리를 설정
# WORKDIR /app
# # 소스 코드 및 package.json 복사

# COPY package.json .
# # npm 패키지 설치

# RUN npm install

# # 소스 코드를 작업 디렉토리로 복사
# COPY . .

# # React 애플리케이션 빌드
# RUN npm run build

# # Nginx를 기반으로한 이미지로 변경
# FROM nginx

# # 작업 디렉토리를 설정
# WORKDIR /app

# # 빌드된 React 애플리케이션을 Nginx의 정적 파일 디렉토리로 복사
# COPY --from=0 /app/build /usr/share/nginx/html

# # Nginx의 기본 설정 파일을 삭제
# RUN rm /etc/nginx/conf.d/default.conf

# # 커스텀 Nginx 설정 파일을 복사
# COPY ./nginx.conf /etc/nginx/conf.d

# # 80 포트 오픈
# EXPOSE 80

# # Nginx 시작
# CMD ["nginx", "-g", "daemon off;"]

# # 이미지의 기반은 Node.js를 포함한 이미지로 설정
# FROM node:14

# # 작업 디렉토리를 설정
# WORKDIR /app
# # 소스 코드 및 package.json 복사

# COPY package.json .
# # npm 패키지 설치

# RUN npm install

# # 소스 코드를 작업 디렉토리로 복사
# COPY . .

# # React 애플리케이션 빌드
# RUN npm run build

# # Nginx를 기반으로한 이미지로 변경
# FROM nginx

# # 작업 디렉토리를 설정
# WORKDIR /app

# # 빌드된 React 애플리케이션을 Nginx의 정적 파일 디렉토리로 복사
# COPY --from=0 /app/build /usr/share/nginx/html

# # # nginx 의 default.conf 를 삭제
# RUN rm /etc/nginx/conf.d/default.conf

# # host pc 의 nginx.conf 를 아래 경로에 복사
# COPY ./nginx.conf /etc/nginx/conf.d

# # 80 포트 오픈
# EXPOSE 80

# # Nginx 시작
# CMD ["nginx", "-g", "daemon off;"]
# react-dockerizing/Dockerfile

# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:14-alpine as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# app dependencies
# 컨테이너 내부로 package.json 파일들을 복사
COPY package*.json ./

# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

# npm build
RUN npm run build

# prod environment
FROM nginx:stable-alpine

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정파일을 컨테이너 내부로 복사한다.
COPY nginx/nginx.conf /etc/nginx/conf.d

# 컨테이너의 80번 포트를 열어준다.
EXPOSE 80

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]