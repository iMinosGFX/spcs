# pull official base image
FROM node:12.16.1-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm config set @optalp:registry https://noodle.opta-lp.com/
COPY package*.json ./
RUN npm ci

# add app
COPY . ./

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 8006

CMD ["nginx", "-g", "daemon off;"]