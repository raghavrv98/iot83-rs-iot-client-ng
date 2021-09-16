FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /usr/src/app/dist/rs-iot-client-ng /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY rs.crt /opt/certificate/rs.crt
COPY rs.key /opt/certificate/rs.key
EXPOSE 80
EXPOSE 443
