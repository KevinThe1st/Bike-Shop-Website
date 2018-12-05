#!/bin/bash
NODE_ENV=test ./node_modules/mocha/bin/mocha test/integration/$1.js