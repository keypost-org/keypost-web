#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "You must supply a file to check!"
  exit 1
fi

tsfmt -r "$1"
./node_modules/eslint/bin/eslint.js "$1"

