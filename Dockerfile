FROM --platform=$BUILDPLATFORM node:19-alpine3.15 as dev
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM --platform=$BUILDPLATFORM node:19-alpine3.15 as build
WORKDIR /app
COPY --from=dev /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.23.3 as prod
EXPOSE 80
COPY --from=build /app/dist/portafolio /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]

