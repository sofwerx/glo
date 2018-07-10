#!/bin/bash
export PATH=./node_modules/.bin:$PATH
# install web dependencies
npm run build
# run it!
npm start

