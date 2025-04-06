FROM node:latest

COPY . /app
WORKDIR /app

ENV TZ=Asia/Seoul
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install

EXPOSE 3000

RUN yarn build
CMD [ "yarn", "start" ]