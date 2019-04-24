FROM cypress/base:11.13.0

WORKDIR /home/node

ADD . .

RUN yarn global add @quasar/cli \
  && yarn && yarn build

