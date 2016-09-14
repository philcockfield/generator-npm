#!/bin/bash
export NODE_ENV=test


./node_modules/mocha/bin/mocha $@ \
  --require ts-node/register \
  --watch-extensions ts,tsx \
  'test/**/*.test.ts{,x}'
