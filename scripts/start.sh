#!/bin/sh
# USAGE: ./scripts/start
# Start the application for development.

echo "Installing node packages"
yarn install

echo "Starting app server"
yarn start
