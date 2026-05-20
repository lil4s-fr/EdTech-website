# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.28.2

# ==========================================
# Build Stage
# ==========================================
FROM base AS build
RUN apt-get update -qq && apt-get install -y build-essential pkg-config python3
WORKDIR /app

COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install -r --offline --frozen-lockfile

# FIX 1: Accept the build argument and expose it to the build environment
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm run -r build
RUN pnpm deploy --filter=back --prod --legacy /prod/back

# ==========================================
# Runner Stage: Next.js (Front)
# ==========================================
FROM base AS front
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy the *contents* of the standalone directory directly into /app
# The trailing slash (/) is the key: it copies the contents, not the folder
COPY --from=build --chown=node:node /app/front/.next/standalone/ ./

# Copy the public folder to the root so Next.js can find your assets
COPY --from=build --chown=node:node /app/front/public ./public

USER node
EXPOSE 3000
# server.js is now at /app/server.js
CMD ["node", "server.js"]

# ==========================================
# Runner Stage: Strapi (Back)
# ==========================================
FROM base AS back
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /prod/back .
RUN chown -R node:node /app/public
USER node
EXPOSE 1337
CMD ["pnpm", "start"]