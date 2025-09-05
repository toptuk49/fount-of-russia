FROM node:20-alpine as build

WORKDIR /app
COPY package.json ./

RUN npm install --legacy-peer-deps --silent --no-fund --no-audit

COPY . .
RUN npm run build

# Production
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/frontend.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
