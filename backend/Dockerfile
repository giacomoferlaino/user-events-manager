FROM node:lts-alpine3.12 AS builder
ENV BUILD_DIR /usr/app/build
ENV DIST_DIR $BUILD_DIR/dist
ENV NODE_MODULES_DIR $BUILD_DIR/node_modules

COPY . $BUILD_DIR
WORKDIR $BUILD_DIR

RUN npm install \
    && npm run build


FROM node:lts-alpine3.12
ENV MAIN_FILE main.js
ENV APP_DIR /usr/app
ENV DIST_DIR $APP_DIR/dist
ENV NODE_MODULES_DIR $APP_DIR/node_modules

COPY --from=builder /usr/app/build/dist $DIST_DIR
COPY --from=builder /usr/app/build/node_modules $NODE_MODULES_DIR

CMD node $DIST_DIR/$MAIN_FILE