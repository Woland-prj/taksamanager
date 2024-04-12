FROM node:21-alpine as build
WORKDIR /opt/app
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build

FROM node:20.1-alpine
WORKDIR /opt/app
COPY --from=build /opt/app/dist ./dist
ADD *.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/main"]
