# TODO: investigate multi-stage Dockerfile
FROM node:18.15.0

RUN ["npm", "install", "-g", "typescript"]

WORKDIR "/app"

# Copy files for building
COPY "./tsconfig.json" "."
COPY "./package.json" "."
COPY "./package-lock.json" "."

RUN ["npm", "install", "--save-prod"]

RUN --mount=type=bind,source="./src",target="/app/src" ["tsc"]

# Remove files for building
RUN ["rm", "./tsconfig.json"]

# Uninstall tsc afterwards
RUN ["npm", "uninstall", "-g", "typescript"]

WORKDIR "/app/build"

# Spin wheels for testing
CMD ["node", "app.js"]