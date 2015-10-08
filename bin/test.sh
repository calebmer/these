#!/bin/bash

export NODE_ENV=test

node_modules/.bin/mocha test.js --require test.env.js $@
