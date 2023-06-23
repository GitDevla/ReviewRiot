FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base as runner
WORKDIR /app
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/node_modules ./node_modules
COPY public ./public
COPY server.js ./
COPY init.js ./
COPY next.config.js ./
EXPOSE 3000
CMD ["node", "server.js"]