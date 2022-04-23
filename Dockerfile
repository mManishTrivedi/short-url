FROM node:17-alpine 

WORKDIR /manish/code

RUN npm install -g yarn --force

COPY package*.json ./
COPY yarn.lock ./

RUN yarn 

COPY . .

# RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start:dev"]
# CMD ["node", "dist/main"]


# build Docker image using below command
# sudo docker build . -t mmanishtrivedi/short-url
# sudo docker --log-level=debug build . -t mmanishtrivedi/short-url

# Run Docket image
# docker run -p 3001:3000 --name app-v1 mmanishtrivedi/short-url
# docker run -p 3001:3000 --net=host --name  app-v1 mmanishtrivedi/short-url


# Get container ID
# docker ps

# If you need to go inside the container you can use the exec command:
# Enter the container
# docker exec -it <container id> /bin/bash

# Print app output
#docker logs <container id>



