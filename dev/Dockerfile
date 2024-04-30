# Based on a Dockerfile I created for another class
# Just has some nice utils for debugging
FROM ubuntu:24.04

# Install useful software
RUN apt update
RUN apt install -y mysql-client
RUN apt install -y ncat
RUN apt install -y iputils-ping
RUN apt install -y curl

# Spin wheels
CMD ["tail", "-f", "/dev/null"]