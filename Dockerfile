FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# Seed auth data path with non-root ownership so named Docker volumes
# inherit writable permissions for USER 1000.
RUN mkdir -p /tmp/cloud-price-data/user-state \
  && chown -R 1000:1000 /tmp/cloud-price-data

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app
COPY --from=build /app /app
COPY --from=build --chown=1000:1000 /tmp/cloud-price-data /tmp/cloud-price-data

ENV NODE_ENV=production
EXPOSE 8080

USER 1000

CMD ["server.js"]
