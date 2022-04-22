FROM node:16-alpine
WORKDIR  /server
COPY ./package.json /server/package.json
RUN yarn install --ignore-engines
COPY . .
RUN npm run --script build
EXPOSE 80
CMD [ "npm", "start" ]