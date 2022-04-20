FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --ignore-engines
COPY . .
RUN npm run --script build
EXPOSE 5000
CMD [ "npm", "start" ]