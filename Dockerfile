FROM ubuntu:latest
 
RUN apt update
 
RUN apt install openjdk-17-jdk -y
 
RUN apt install maven -y
 
WORKDIR /directdealz
 
COPY . /directdealz/
 
ENTRYPOINT [ "mvn","spring-boot:run" ]