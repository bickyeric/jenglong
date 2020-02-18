.PHONY: deploy

export VERSION ?= $(shell git show -q --format=%h)

build:
	docker build -t bickyeric/jenglong:$(VERSION) -f Dockerfile .

push:
	docker push bickyeric/jenglong:$(VERSION)

deploy:
	envsubst < deploy/template.yml > deploy.yml
	docker stack deploy --compose-file deploy.yml jenglong
