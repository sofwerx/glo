#!/bin/bash
export PATH=./node_modules/.bin:$PATH

# install web dependencies
yarn run build
# run it!
yarn run start
