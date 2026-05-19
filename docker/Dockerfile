# Development stage
FROM oven/bun:1 AS dev

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
EXPOSE 4321
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# Production build stage
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Production serve stage
FROM oven/bun:1 AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 4321
CMD ["bun", "run", "preview", "--host", "0.0.0.0"]
