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

# Standalone output structure (with outputFileTracingRoot = workspace root):
#   .next/standalone/
#     ├── front/
#     │   ├── server.js          ← entry point
#     │   └── .next/             ← server chunks
#     ├── node_modules/          ← hoisted deps
#     └── package.json
COPY --from=build --chown=node:node /app/front/.next/standalone ./

# Static assets and public folder must sit next to server.js
COPY --from=build --chown=node:node /app/front/.next/static ./front/.next/static
COPY --from=build --chown=node:node /app/front/public ./front/public

USER node
EXPOSE 3000

# Run from the front/ directory so Next can resolve .next/static and public/ relatively
WORKDIR /app/front
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