FROM mhart/alpine-node:6.3.0

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
COPY . /opt/app

EXPOSE 8000

CMD ["node", "dist/server.js"]
