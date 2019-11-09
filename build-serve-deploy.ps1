function Clean {
  Remove-Item -path ./dist -recurse -ErrorAction Ignore
}

function Build {
  npx webpack-cli --mode production
}

function Serve {
  http-server ./dist
}

function Deploy {
  cd ./dist/

  npx tfx-cli extension create

  cd ..
}

function Restart {
  Remove-Item -path ./node_modules -recurse -ErrorAction Ignore

  npm install
}

If ($args[0] -eq "--clean") {
  Clean
}

If ($args[0] -eq "--build") {
  Build
}

If ($args[0] -eq "--serve") {
  Serve
}

If ($args[0] -eq "--deploy") {
  Deploy
}

If ($args[0] -eq "--restart") {
  Restart
}

If ($args[0] -eq "--all") {
  Clean

  Build

  Deploy
}
