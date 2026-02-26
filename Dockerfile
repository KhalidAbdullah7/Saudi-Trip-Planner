# ── Stage 1: Install deps & build ─────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for layer-caching
COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy everything else and build the frontend
COPY . .
RUN npm run build

# ── Stage 2: Production image ────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --ignore-scripts

# Copy Prisma schema + generated client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy server source (tsx runs TypeScript directly)
COPY server ./server
COPY tsconfig.json tsconfig.node.json ./

# Install tsx for running TypeScript at runtime (small footprint)
RUN npm install tsx --save

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Run migrations, seed, then start server
CMD ["sh", "-c", "npx prisma migrate deploy && node node_modules/.bin/tsx server/index.ts"]
