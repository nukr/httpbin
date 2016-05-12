#!/bin/bash

VERSION=$(grep '"version":' package.json | awk '{print $2}' | sed 's/[,"]//g')

docker build \
  -t asia.gcr.io/instant-matter-785/httpbin:${VERSION} \
  -t asia.gcr.io/instant-matter-785/httpbin:latest \
  -t nukr/httpbin:${VERSION} \
  -t nukr/httpbin:latest \
  .
