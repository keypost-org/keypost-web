#!/bin/bash

set -e

PYTHON_VERSION=$(python3 --version | grep -o "Python 3\.1[0-9]")
if [ -z "$PYTHON_VERSION" ]; then
  echo "Please install Python version 3.10 or later!"
  exit 1
fi

POSTGRES_VERSION=$(psql --version | grep -o "psql (\w.*) 14\.[0-9]")
if [ -z "$POSTGRES_VERSION" ]; then
  echo "Please install PostgreSQL 14.x or later!"
  exit 1
fi

echo "Installing Django..."
python3 -m pip install Django

echo "Done!"
