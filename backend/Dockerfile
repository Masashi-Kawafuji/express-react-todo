FROM node:14.15.4-alpine

RUN apk add yarn
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .

EXPOSE 3000

CMD ["yarn", "dev-start"]