FROM nginx:1.23-alpine

RUN set -xe \
    && sed -i 's/v3.15/v3.16/g' /etc/apk/repositories \
    && apk update \
    && apk upgrade --no-cache  --force-overwrite --force-refresh --purge --available --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main \
    && apk upgrade busybox --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main \
    && sync