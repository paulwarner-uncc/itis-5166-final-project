FROM alpine:3.19.1

COPY "./init.sql" "/"

RUN apk add --no-cache mysql-client

COPY "./init.sh" "/"

CMD ["sh", "/init.sh"]