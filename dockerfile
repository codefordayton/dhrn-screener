FROM node:22-alpine
WORKDIR /dayton-home-repair-network/
COPY dist/ /dayton-home-repair-network/dist
COPY src/ /dayton-home-repair-network/src
COPY package.json /dayton-home-repair-network/
RUN npm install
CMD ["npm","run","dev"]
