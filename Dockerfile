FROM node:19-alpine AS base
ARG USER=1000

WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile --link-duplicates
COPY . .

FROM base AS development
CMD ["yarn", "start"]

FROM base AS production
RUN yarn global add serve
RUN yarn build
RUN deluser --remove-home node \
    && addgroup -S node -g 1001 \
    && adduser -S -G node -u 1001 node

USER 1001
EXPOSE 3000
CMD ["serve", "build", "--listen", "3000"]