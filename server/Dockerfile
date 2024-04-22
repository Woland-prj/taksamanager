FROM node:21-alpine as deps
WORKDIR /opt/server
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM node:21-alpine as build
WORKDIR /opt/server
COPY . .
COPY --from=deps /opt/server/node_modules ./node_modules
RUN yarn prisma generate
RUN yarn build

FROM node:21-alpine as runner
WORKDIR /opt/server
ENV NODE_ENV production

COPY --from=build /opt/server/dist ./dist
COPY --from=build /opt/app/prisma ./prisma
COPY --from=build /opt/client/package.json ./package.json
ADD .env ./
ADD service_account.json ./

EXPOSE 3200
CMD ["yarn", "start:docker:dev"]

# FROM node:21-alpine as build
# WORKDIR /opt/app
# ADD package*.json ./
# RUN npm install
# ADD . .
# RUN npx prisma generate
# RUN npm run build
#
# FROM node:21-alpine
# WORKDIR /opt/app
# COPY --from=build /opt/app/dist ./dist
# COPY --from=build /opt/app/prisma ./prisma
# ADD package*.json ./
# ADD .env ./
# ADD service_account.json ./
# RUN npm install --omit=dev
# EXPOSE 3200
# CMD ["npm", "run", "start:docker:dev"]
