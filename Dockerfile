FROM node:19-alpine AS base
ARG USER=1000

WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile --link-duplicates
COPY . .

FROM base AS development
CMD ["yarn", "start"]

FROM base AS production
ENV REACT_APP_AAD_TENANT_ID=3aa4a235-b6e2-48d5-9195-7fcf05b459b0
ENV REACT_APP_AAD_CLIENT_ID=e8a0f8e6-059b-426f-9011-40f463640285
ENV REACT_APP_BACKEND_API_SCOPE=api://e8a0f8e6-059b-426f-9011-40f463640285/read
ENV REACT_APP_BACKEND_URL=https://api-pepm-dev.radix.equinor.com
ENV REACT_APP_AAD_REDIRECT_URI=/

RUN yarn global add serve
RUN yarn build

# Add non-root user
RUN deluser --remove-home node \
    && addgroup -S node -g 1001 \
    && adduser -S -G node -u 1001 node

USER 1001
EXPOSE 3000
CMD ["serve", "build", "--listen", "3000"]