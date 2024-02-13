FROM node:20.7.0-alpine3.18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production
ENV PORT 5051
CMD ["node", "build"]