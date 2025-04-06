FROM node:22
WORKDIR /home/node/app
CMD [ "/bin/bash", "-c", "npm install && npm run dev" ]