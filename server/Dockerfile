FROM node:21-alpine as build
WORKDIR /opt/app
ADD package*.json ./
RUN npm install
ADD . .
RUN npx prisma generate
RUN npm run build

FROM node:21-alpine
WORKDIR /opt/app
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/prisma ./prisma
ADD package*.json ./
ADD .env ./
ADD service_account.json ./
RUN npm ci --omit=dev
EXPOSE 3200
CMD ["npm", "run", "start:migrate:prod"]
