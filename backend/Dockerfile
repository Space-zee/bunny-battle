# Install all dependencies
FROM node:20-slim AS dev
WORKDIR /app

COPY package*.json ./
RUN npm ci


# Build image with prod dependencies only
FROM node:20-slim AS prod

WORKDIR /app
ENV NODE_ENV production

# We need to copy node_modules from dev because Nest CLI is a dev dependency.
COPY --from=dev /app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm ci && npm cache clean --force


# Runtime lightweight image
FROM node:20-slim AS runtime

WORKDIR /app

RUN groupmod -g 1001 node \
    && usermod -u 1001 -g 1001 node

COPY --chown=node:node --from=prod /app/dist dist
COPY --chown=node:node --from=prod /app/node_modules node_modules

USER node

CMD ["node", "dist/src/main"]
