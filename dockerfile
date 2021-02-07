FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY . /usr/src/app
RUN npm i -g typescript
RUN npm install pm2 -g
RUN npm ci

RUN npm run build

EXPOSE 8080
CMD ["pm2-docker", "--json", "dist/index.js"]