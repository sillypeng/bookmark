FROM node:latest
ENV http_proxy: http://172.16.0.56:9876/
ENV https_proxy: http://172.16.0.56:9876/
WORKDIR /usr/src/app
RUN npm install
CMD ["npm", "start"]


