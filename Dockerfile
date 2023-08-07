FROM node:19-alpine3.17

RUN apk update  \
        && apk upgrade --no-cache  --force-overwrite --force-refresh --purge --available \
	&& apk add python3 make g++ imagemagick ghostscript ffmpeg vips vips-dev gcompat


RUN apk --no-cache add \
            openjdk11-jre \
            util-linux \
            libreoffice-common \
            libreoffice-writer \
            font-droid-nonlatin \
            font-droid \
            font-dejavu \
            font-freefont \
            font-liberation \
        && cp /usr/bin/python3 /usr/bin/python \
        && rm -rf /var/cache/apk/* \

WORKDIR /www

COPY package*.json ./

COPY . .

RUN npm install -g @nestjs/cli

