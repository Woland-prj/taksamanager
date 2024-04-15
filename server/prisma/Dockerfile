FROM node:21-alpine
RUN npm install -g --unsafe-perm prisma
WORKDIR /opt/app

COPY ./ ./prisma/

RUN npm init -y

CMD [ "npx", "prisma", "studio" ]
