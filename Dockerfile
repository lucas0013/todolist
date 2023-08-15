FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
EXPOSE 80
CMD ["yarn", "dev"]