FROM node:22
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

CMD [ "npm", "run", "dev" ]