FROM node:lts-alpine3.12 AS builder
ENV BUILD_DIR /usr/app/build
ENV DIST_DIR $BUILD_DIR/dist
ENV NODE_MODULES_DIR $BUILD_DIR/node_modules

COPY . $BUILD_DIR
WORKDIR $BUILD_DIR

RUN npm install \
    && npm run build


FROM python:3.10.0a6-alpine3.12
ENV MAIN_FILE main.js
ENV APP_DIR /usr/app
ENV DIST_DIR $APP_DIR/dist

COPY --from=builder /usr/app/build/dist $DIST_DIR

WORKDIR $DIST_DIR

CMD python3 -m http.server 4200
