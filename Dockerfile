FROM node:16-alpine 

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm install

ENV HOST="0.0.0.0" 
ENV PORT=3000
ENV APP_URL="http://0.0.0.0:3000"
ENV WS_URL="ws://0.0.0.0:3000"
ENV NODE_ENV="production"

RUN npm run build && npm prune --production && npm cache clean --force

EXPOSE 3000
CMD ["node", "dist/server/prodServer.js"]