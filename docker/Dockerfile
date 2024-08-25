# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.14.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS"
WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config

# Install node modules
COPY --link package-lock.json package.json ./

FROM base AS development
ARG VITE_NODE_ENV=development
ENV VITE_NODE_ENV=${VITE_NODE_ENV}
RUN npm i --include=dev
COPY  --link . .
EXPOSE 80
CMD [ "npm", "run", "dev"]

FROM base AS build
RUN npm ci 
COPY --link . .
RUN npm run build

FROM nginx:alpine AS production
ARG VITE_NODE_ENV=production
ENV VITE_NODE_ENV=${VITE_NODE_ENV}
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
