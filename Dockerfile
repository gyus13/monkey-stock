# 베이스 이미지 사용
FROM node:16-alpine as builder

# client 경로에서 작업할 것을 지정함
WORKDIR  /client

# COPY 설정 파일 먼저 복사 ( 레이어 쌓기 )
COPY ./package.json /client/package.json
COPY ./yarn.lock /client/yarn.lock

# 이미지 상에서 명령을 실행함
RUN yarn install --network-timeout=600000

# src 나 public 등 나머지 파일을 이후 설정파일 레이어 이후에 얹음
COPY   ./public       /client/public
COPY   ./src          /client/src

# 빌드
RUN yarn build

# 사실 nginx 로 빌드할 거임
FROM nginx:alpine

# 포트 넘버 80 을 사용하도록 명시
EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /client/build /usr/share/nginx/html