FROM node:21-alpine as deps
WORKDIR /opt/client
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM node:21-alpine as build
WORKDIR /opt/client
COPY . .
COPY --from=deps /opt/client/node_modules ./node_modules
RUN yarn build

FROM node:21-alpine as runner
WORKDIR /opt/client
ENV NODE_ENV production

COPY --from=build /opt/client/public ./public
COPY --from=build /opt/client/package.json ./package.json
COPY --from=build /opt/client/.next ./.next
# COPY --from=build /opt/client/node_modules ./node_modules

EXPOSE 3100
CMD ["yarn", "start"]
