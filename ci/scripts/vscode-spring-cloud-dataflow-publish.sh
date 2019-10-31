#!/bin/bash
set -e
cd git-repo

envsubst < ~/.npmrc > ~/.npmrc.tmp && mv  ~/.npmrc.tmp ~/.npmrc
npm install && npm run build
mkdir -p org/springframework/cloud/dataflow
mv *.vsix org/springframework/cloud/dataflow/
mv org ../distribution-repository/
