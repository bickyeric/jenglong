export VERSION ?= $(shell git show -q --format=%h)

build:
	docker build -t bickyeric/jenglong:$(VERSION) -f Dockerfile .

push:
	docker push bickyeric/jenglong:$(VERSION)
