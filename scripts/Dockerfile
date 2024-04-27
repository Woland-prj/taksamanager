FROM node:21-alpine as runner
WORKDIR /opt/proxy
ENV NODE_ENV production

ADD . /opt/proxy

RUN yarn init -y
RUN yarn add reverse_proxy_pathmapper 

CMD ["node", "proxy.mjs"]
