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

# 1. Use the '/.' syntax to copy the CONTENTS of standalone into /app
# If your build stage has the files at /app/front/.next/standalone, use this:
COPY --from=build --chown=node:node /app/front/.next/standalone/. ./

# 2. If 'public' or 'static' weren't included in the standalone folder
# (which they often aren't by default), copy them manually to their expected locations
COPY --from=build --chown=node:node /app/front/public ./public
COPY --from=build --chown=node:node /app/front/.next/static ./.next/static

USER node
EXPOSE 3000

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