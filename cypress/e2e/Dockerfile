FROM cypress/base:11.13.0

WORKDIR /home/node

ADD ./cypress ./cypress
ADD ./common/cypress ./common/cypress
ADD ./common/cypress/config/e2e.json ./cypress.json
ADD ./package.json .
ADD ./common/src/types ./common/src/types
ADD ./dist ./dist

RUN yarn global add @quasar/cli \
  && yarn
