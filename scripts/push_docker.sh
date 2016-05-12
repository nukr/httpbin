#!/bin/bash

VERSION=$(ag version package.json | awk '{print $3}' | sed 's/[,"]//g')

docker push nukr/httpbin:${VERSION} && docker push nukr/httpbin:latest
gcloud docker push asia.gcr.io/instant-matter-785/httpbin:${VERSION} && gcloud docker push asia.gcr.io/instant-matter-785/httpbin:latest
