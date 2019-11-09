#!/bin/bash

function Clean () {
  rm -rf ./dist
}

function Build () {
  npx webpack-cli --mode production
}

function Serve () {
  npx http-server ./dist
}

function Deploy () {
  cd ./dist/

  npx tfx-cli extension create

  cd ..
}

function Restart () {
  rm -rf ./node_modules

  npm install
}

if [[ $1 == "--clean" ]]; then
  Clean
fi

if [[ $1 == "--build" ]]; then
  Build
fi

if [[ $1 == "--serve" ]]; then
  Serve
fi

if [[ $1 == "--deploy" ]]; then
  Deploy
fi

if [[ $1 == "--restart" ]]; then
  Restart
fi

if [[ $1 == "--all" ]]; then
  Clean

  Build

  Deploy
fi
