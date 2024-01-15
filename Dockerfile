FROM node:18-alpine

WORKDIR .

COPY package*.json ./

RUN npm install

# # Install curl and tar
# RUN apk add --no-cache curl tar

# # Download the mongosh .tgz package
# RUN curl -o mongosh.tgz https://downloads.mongodb.com/compass/mongosh-2.1.1-linux-x64.tgz

# # Extract the mongosh .tgz package
# RUN tar -xf mongosh.tgz

# # Move the mongosh binary to /usr/local/bin/ so it can be accessed from anywhere
# RUN mv mongosh-2.1.1-linux-x64/bin/mongosh /usr/local/bin/

# # Make the mongosh binary executable
# RUN chmod +x /usr/local/bin/mongosh

# # Print the contents of /usr/local/bin/ to verify that mongosh is there
# RUN ls -la /usr/local/bin/

# # Print the PATH to verify that it includes /usr/local/bin/
# RUN echo $PATH

# # Remove the .tgz package and the extracted directory
# RUN rm mongosh.tgz
# RUN rm -r mongosh-2.1.1-linux-x64

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]