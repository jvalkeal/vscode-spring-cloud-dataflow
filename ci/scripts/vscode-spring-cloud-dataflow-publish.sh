#!/bin/bash
set -e
cd git-repo

envsubst < ~/.npmrc > ~/.npmrc.tmp && mv  ~/.npmrc.tmp ~/.npmrc
npm install && npm run build && npm run rename-snapshot
mkdir -p org/springframework/cloud/dataflow/vscode-spring-cloud-dataflow
mv *.vsix org/springframework/cloud/dataflow/vscode-spring-cloud-dataflow/
mv org ../distribution-repository/
