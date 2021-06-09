# Use the official image as a parent image.
FROM node:current as build-deps

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json yarn.lock ./

# Run the command inside your image filesystem.
RUN yarn

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . ./

RUN yarn build

FROM nginx:1.12-alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]