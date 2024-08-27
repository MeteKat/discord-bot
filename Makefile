CONNECT_STRING = -i ~/dcbot-2.pem ec2-user@16.171.146.128



git:
	git add .
	git commit -m $(message)

ssh:
	ssh $(CONNECT_STRING) 

sftp:
	sftp $(CONNECT_STRING)

deploy: git
	ssh $(CONNECT_STRING) -t 'cd /home/ec2-user/server && git pull && make stop && make clean && make build && make run'

build:
	docker build -t dcbot:latest .

run:
	docker run -d dcbot:latest

stop:
	docker stop $(shell docker ps -q)

clean:
	docker rm $(shell docker ps -a -q)
	docker rmi $(shell docker images -q)


all: deploy



help:
	@echo "deploy - Deploy the bot to the server"
	@echo "build - Build the docker image"
	@echo "run - Run the docker container"
	@echo "stop - Stop the docker container"
	@echo "clean - Remove all docker containers and images"
	@echo "ssh - SSH into the server"
	@echo "sftp - SFTP into the server"

readme:
	@echo "This is a makefile for deploying the bot to the server"
	@echo "To deploy the bot, run 'make deploy'"
	@echo "To build the docker image, run 'make build'"
	@echo "To run the docker container, run 'make run'"
	@echo "To stop the docker container, run 'make stop'"
	@echo "To clean up all docker containers and images, run 'make clean'"
	@echo "To SSH into the server, run 'make ssh'"
	@echo "To SFTP into the server, run 'make sftp'"


.PHONY: deploy build run stop clean ssh sftp