FROM node:4.4.3

COPY package.json ./
RUN npm install

COPY ./ ./

RUN npm prune --production

CMD ["npm", "start"]