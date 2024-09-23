FROM node:18-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV NODE_ENV dev
ENV PORT 3000

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]