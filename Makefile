#Makefile variables, make code simplier
COMPOSE_FILE ?= docker-compose.yaml
DOCKER_COMPOSE ?= docker-compose -f ${COMPOSE_FILE}
DOCKER_EXEC ?= docker-compose exec -it
DOCKER_RUN ?= ${DOCKER_COMPOSE} run --rm --service-ports

# PHONY sets a virtual target when running Makefile commands, avoids targetting real files!
# -----------------------------------------------------------------------------------------------
install:
	npm install
.PHONY: install

build:
	${DOCKER_COMPOSE} build
.PHONY: build

# update dependencies
update:
	npm install
.PHONY: update
# removes all containers associated with the app
down:
	${DOCKER_COMPOSE} down
.PHONY: down

# starts the images which runs in the an isolated environment
up-all:
	${DOCKER_COMPOSE} up -d
.PHONY: up-all

start:
	npm run start
.PHONY: start

test:
	npm run test:watch
.PHONY: test

lint:
	npm run lint
.PHONY: lint

exec:
	${DOCKER_EXEC} app /bin/bash
.PHONY: exec
# Useful aliases
# -----------------------------------------------------------------------------------------------

dev: down up-all
.PHONY: dev
