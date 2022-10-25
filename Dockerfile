FROM node:18-alpine 

RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/

RUN npm ci

ENV HOST="0.0.0.0" 
ENV PORT=3000
ENV APP_URL="http://0.0.0.0:3000"
ENV WS_URL="ws://0.0.0.0:3000"
ENV NODE_ENV="production"

RUN npm run build && npm prune --production && npm cache clean --force

EXPOSE 3000
USER node
CMD ["dumb-init", "node", "dist/server/prodServer.js"]