FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install --production

COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

COPY --from=builder /app/dist /app/dist
CMD ["npm", "run", "start:prod"]
